export interface Product {
  id: string;
  category_id: string;
  sku: string;
  name: string;
  slug: string;
  short_description: string;
  long_description: string;
  price: number;
  compare_at_price?: number;
  inventory_quantity: number;
  weight: number;
  dimensions: {
    length?: number;
    width?: number;
    height?: number;
  };
  image_urls: string[];
  gtin?: string;
  mpn?: string;
  brand: string;
  compliance_certifications: string[];
  waste_type: 'sharps' | 'biohazard' | 'trace-chemo' | 'pharmaceutical' | 'medical-waste';
  capacity?: string;
  features: string[];
  is_active: boolean;
  subscription_eligible: boolean;
  monthly_price?: number;
  stripe_price_id?: string;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url?: string;
  parent_id?: string;
  sort_order: number;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  session_id: string;
  product_id: string;
  quantity: number;
  product?: Product;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  customer_email: string;
  customer_name: string;
  product_id: string;
  frequency: 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
  quantity: number;
  next_delivery_date: string;
  status: 'active' | 'paused' | 'cancelled';
  stripe_subscription_id?: string;
  shipping_address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_email: string;
  customer_name: string;
  shipping_address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  billing_address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  tracking_number?: string;
  stripe_payment_intent_id?: string;
  created_at: string;
  updated_at: string;
}
