import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import ProductGrid from './components/ProductGrid';
import EducationalSection from './components/EducationalSection';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import SEO from './components/SEO';
import StructuredData from './components/StructuredData';
import { Product } from './types';
import { supabase } from './lib/supabase';

interface CartItem {
  product: Product;
  quantity: number;
}

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('easyrxcycle_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }

    const fetchProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true);
      if (data) setProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('easyrxcycle_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleCheckoutSuccess = () => {
    setCartItems([]);
    setCheckoutOpen(false);
    alert('Order placed successfully! You will receive a confirmation email shortly.');
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      <SEO />
      <StructuredData products={products} />
      <Header cartItemCount={cartItemCount} onCartClick={() => setCartOpen(true)} />
      <Hero />
      <HowItWorks />
      <ProductGrid onAddToCart={handleAddToCart} />
      <EducationalSection />
      <Footer />
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
      <Checkout
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cartItems}
        onSuccess={handleCheckoutSuccess}
      />
    </div>
  );
}

export default App;
