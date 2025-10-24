import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@14.11.0";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RequestBody {
  customerEmail: string;
  customerName: string;
  productId: string;
  priceId: string;
  frequency: string;
  quantity: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!stripeSecretKey || !supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing required environment variables");
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2024-11-20.acacia",
    });

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const {
      customerEmail,
      customerName,
      productId,
      priceId,
      frequency,
      quantity,
      shippingAddress,
    }: RequestBody = await req.json();

    let customer;
    const existingCustomers = await stripe.customers.list({
      email: customerEmail,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
        metadata: {
          source: "easyrxcycle",
        },
      });
    }

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: priceId,
          quantity,
        },
      ],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
      metadata: {
        productId,
        frequency,
      },
    });

    const nextDeliveryDate = new Date();
    if (frequency === "monthly") {
      nextDeliveryDate.setMonth(nextDeliveryDate.getMonth() + 1);
    } else if (frequency === "quarterly") {
      nextDeliveryDate.setMonth(nextDeliveryDate.getMonth() + 3);
    } else if (frequency === "semi-annual") {
      nextDeliveryDate.setMonth(nextDeliveryDate.getMonth() + 6);
    } else if (frequency === "annual") {
      nextDeliveryDate.setFullYear(nextDeliveryDate.getFullYear() + 1);
    }

    const { error: dbError } = await supabase.from("subscriptions").insert({
      customer_email: customerEmail,
      customer_name: customerName,
      product_id: productId,
      frequency,
      quantity,
      next_delivery_date: nextDeliveryDate.toISOString().split("T")[0],
      status: "active",
      stripe_subscription_id: subscription.id,
      shipping_address: shippingAddress,
    });

    if (dbError) throw dbError;

    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

    return new Response(
      JSON.stringify({
        subscriptionId: subscription.id,
        clientSecret: paymentIntent.client_secret,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});