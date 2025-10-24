# Fix Checkout - Add Stripe Key

## The Problem
The credit card form isn't showing because Stripe isn't configured yet.

## The Solution (2 steps)

### Step 1: Get Your Stripe Key
1. Go to https://dashboard.stripe.com/register (or login if you have an account)
2. Navigate to **Developers** → **API keys**
3. Copy your **Publishable key** (starts with `pk_test_...`)

### Step 2: Add Key to .env File
Open `.env` and replace this line:
```
VITE_STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLISHABLE_KEY_HERE
```

With your actual key:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51abc123...
```

### Step 3: Restart Dev Server
After adding the key, restart your development server to load the new environment variable.

## How It Works

The checkout has 2 steps:

**Step 1: Shipping Information** ✅ (Already working)
- Customer fills in name, address, etc.

**Step 2: Payment Form** ⚠️ (Needs Stripe key)
- Stripe payment element loads
- Customer enters card details
- Payment processes securely

Once you add your Stripe publishable key, the payment form will appear on step 2!

## Test It

After adding your key:
1. Add items to cart
2. Click checkout
3. Fill shipping info
4. You'll see the credit card form
5. Use test card: `4242 4242 4242 4242`

## Need a Stripe Account?

Sign up free at: https://dashboard.stripe.com/register

It takes 2 minutes and gives you test keys immediately.
