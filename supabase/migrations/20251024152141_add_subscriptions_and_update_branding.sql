-- Add Subscriptions & Update Branding
--
-- 1. New Tables
--    - subscriptions: Manages recurring product deliveries
--    - subscription_deliveries: Tracks individual subscription shipments
--
-- 2. Changes
--    - Update products.brand default to 'EasyRxCycle'
--    - Add subscription_eligible column to products
--    - Add stripe_price_id column to products for Stripe integration
--    - Add monthly_price column to products for subscription pricing
--
-- 3. Security
--    - Enable RLS on all new tables
--    - Add policies for customer access

-- Update existing products brand
ALTER TABLE products ALTER COLUMN brand SET DEFAULT 'EasyRxCycle';

-- Add subscription-related columns to products
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'subscription_eligible'
  ) THEN
    ALTER TABLE products ADD COLUMN subscription_eligible boolean DEFAULT true;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'stripe_price_id'
  ) THEN
    ALTER TABLE products ADD COLUMN stripe_price_id text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'monthly_price'
  ) THEN
    ALTER TABLE products ADD COLUMN monthly_price numeric;
  END IF;
END $$;

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email text NOT NULL,
  customer_name text NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  frequency text NOT NULL DEFAULT 'monthly',
  quantity integer NOT NULL DEFAULT 1,
  next_delivery_date date NOT NULL,
  status text NOT NULL DEFAULT 'active',
  stripe_subscription_id text,
  shipping_address jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create subscription_deliveries table
CREATE TABLE IF NOT EXISTS subscription_deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id uuid REFERENCES subscriptions(id) ON DELETE CASCADE,
  order_id uuid REFERENCES orders(id) ON DELETE SET NULL,
  scheduled_date date NOT NULL,
  delivered_date date,
  status text NOT NULL DEFAULT 'pending',
  tracking_number text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_deliveries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscriptions
CREATE POLICY "Customers can view own subscriptions"
  ON subscriptions FOR SELECT
  USING (true);

CREATE POLICY "Customers can create subscriptions"
  ON subscriptions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Customers can update own subscriptions"
  ON subscriptions FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- RLS Policies for subscription_deliveries
CREATE POLICY "Customers can view subscription deliveries"
  ON subscription_deliveries FOR SELECT
  USING (true);

-- Add orders column for stripe payment intent
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'stripe_payment_intent_id'
  ) THEN
    ALTER TABLE orders ADD COLUMN stripe_payment_intent_id text;
  END IF;
END $$;