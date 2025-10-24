# EasyRxCycle Setup Guide

Complete guide to get your EasyRxCycle website up and running with Stripe payments.

## Step 1: Install Dependencies

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

## Step 2: Set Up Stripe Account

1. **Create Stripe Account**
   - Go to https://dashboard.stripe.com/register
   - Complete account verification
   - Activate your account

2. **Get API Keys**
   - Go to Developers → API keys
   - Copy your **Publishable key** (pk_test_... for test mode)
   - Copy your **Secret key** (sk_test_... for test mode)

## Step 3: Configure Environment Variables

Add to your `.env` file:

```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

## Step 4: Deploy Edge Functions

The following Edge Functions need to be deployed to Supabase:

### Deploy create-payment-intent function:

```bash
# The function is already created in supabase/functions/create-payment-intent/
# You need to tell me when you're ready to deploy and I'll use the deployment tool
```

### Deploy create-subscription function:

```bash
# The function is already created in supabase/functions/create-subscription/
# Ready to deploy when you have your Stripe keys
```

## Step 5: Configure Stripe Secret in Supabase

The Stripe Secret Key needs to be added as an environment variable in Supabase:

1. Go to your Supabase Dashboard
2. Navigate to Project Settings → Edge Functions
3. Add environment variable:
   - Name: `STRIPE_SECRET_KEY`
   - Value: `sk_test_your_secret_key_here`

## Step 6: Create Stripe Products (for Auto-Ship)

For products that support subscriptions, you need to:

1. Go to Stripe Dashboard → Products
2. Create a product for each subscription item
3. Add pricing (monthly, quarterly, etc.)
4. Copy the Price ID (starts with `price_...`)
5. Update the product in your database:

```sql
UPDATE products
SET stripe_price_id = 'price_your_price_id_here',
    monthly_price = 21.99
WHERE sku = 'ERXC-SHARP-1Q';
```

## Step 7: Test the Integration

### Test Cards (Stripe Test Mode):

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Requires Authentication**: 4000 0025 0000 3155

### Test Flow:

1. Add products to cart
2. Click "Proceed to Checkout"
3. Fill in shipping information
4. Use test card for payment
5. Verify order is created in database

## Step 8: Set Up Webhooks (Optional but Recommended)

For production, set up webhooks to handle:

- Payment confirmations
- Subscription renewals
- Failed payments

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-project.supabase.co/functions/v1/stripe-webhook`
3. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`

## Step 9: Go Live

When ready for production:

1. Switch to Live mode in Stripe Dashboard
2. Get your live API keys (pk_live_... and sk_live_...)
3. Update environment variables with live keys
4. Complete Stripe account activation requirements
5. Test thoroughly before accepting real payments

## Troubleshooting

### "Stripe publishable key not found"
- Make sure `.env` has `VITE_STRIPE_PUBLISHABLE_KEY`
- Restart dev server after adding

### "Failed to create payment intent"
- Check that Edge Function is deployed
- Verify `STRIPE_SECRET_KEY` is set in Supabase
- Check Edge Function logs in Supabase Dashboard

### Payment fails at checkout
- Verify test card number is correct
- Check Stripe Dashboard logs
- Ensure amount is greater than $0.50

## Support

For help with Stripe integration:
- **Email**: info@easyrxcycle.com
- **Phone**: 501.904.2929
- **Stripe Support**: https://support.stripe.com

## Next Steps

After Stripe is working:

1. Set up email notifications (order confirmations)
2. Configure shipping label generation
3. Set up subscription management portal
4. Add order tracking functionality
5. Implement customer dashboard
