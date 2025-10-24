import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.warn('Stripe publishable key not found. Payment features will be disabled.');
}

export const stripePromise = stripePublishableKey
  ? loadStripe(stripePublishableKey)
  : null;

export const createPaymentIntent = async (amount: number, metadata?: Record<string, string>) => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_Bolt_Database_URL;

  const response = await fetch(`${supabaseUrl}/functions/v1/create-payment-intent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_Bolt_Database_ANON_KEY}`,
    },
    body: JSON.stringify({ amount, metadata }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create payment intent');
  }

  return response.json();
};

export const createSubscription = async (subscriptionData: {
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
}) => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_Bolt_Database_URL;

  const response = await fetch(`${supabaseUrl}/functions/v1/create-subscription`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_Bolt_Database_ANON_KEY}`,
    },
    body: JSON.stringify(subscriptionData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create subscription');
  }

  return response.json();
};
