# Stripe Integration - Quick Start

## 🚀 Quick Setup (5 minutes)

### 1. Get Your Stripe Keys

1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy these two keys:
   - **Publishable key**: `pk_test_...`
   - **Secret key**: `sk_test_...`

### 2. Add Keys to Project

**In your `.env` file:**
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51...
```

**In Supabase (for Edge Functions):**
1. Go to Supabase Dashboard → Project Settings → Edge Functions
2. Add secret:
   - Name: `STRIPE_SECRET_KEY`
   - Value: `sk_test_51...`

### 3. Deploy Edge Functions

Tell me when you're ready and I'll deploy these for you:
- `create-payment-intent` - Handles one-time payments
- `create-subscription` - Handles recurring subscriptions

### 4. Test Payment Flow

1. Add items to cart
2. Click "Proceed to Checkout"
3. Fill in any test shipping info
4. Use test card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

## ✅ What's Already Done

- ✅ Stripe checkout components created
- ✅ Payment processing Edge Functions written
- ✅ Database schema for orders and subscriptions
- ✅ Shopping cart with persistent storage
- ✅ Full checkout flow with shipping info
- ✅ Auto-ship subscription support
- ✅ Order confirmation and tracking

## 🎯 What You Need to Do

1. **Get Stripe keys** (2 minutes)
2. **Add keys to project** (1 minute)
3. **Let me deploy Edge Functions** (1 minute)
4. **Test with test card** (1 minute)

## 📝 Test Cards

| Card Number | Purpose |
|------------|---------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 0002 | Card declined |
| 4000 0025 0000 3155 | Requires 3D Secure |

## 🔧 Deploy Edge Functions

When you're ready, just tell me and I'll run:

```bash
# I'll use the Supabase MCP tool to deploy:
# - create-payment-intent function
# - create-subscription function
```

## 📞 Need Help?

- Check `SETUP_GUIDE.md` for detailed instructions
- Email: info@easyrxcycle.com
- Phone: 501.904.2929

## 🎉 Next Steps After Testing

Once payments work:
1. Switch to live Stripe keys for production
2. Set up webhook for payment notifications
3. Configure email confirmations
4. Enable subscription management portal
