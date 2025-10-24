import { Phone, Mail, ShoppingCart, Menu } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export default function Header({ cartItemCount, onCartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="bg-teal-700 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:5019042929" className="flex items-center gap-2 hover:text-teal-100 transition">
              <Phone size={14} />
              <span className="hidden sm:inline">501.904.2929</span>
            </a>
            <a href="mailto:info@easyrxcycle.com" className="flex items-center gap-2 hover:text-teal-100 transition">
              <Mail size={14} />
              <span className="hidden sm:inline">info@easyrxcycle.com</span>
            </a>
          </div>
          <div className="text-xs sm:text-sm">
            <span className="font-semibold">Free Shipping</span> on orders over $50
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center">
            <div className="text-2xl font-bold text-teal-700">EasyRx<span className="text-teal-500">Cycle</span></div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#products" className="text-gray-700 hover:text-teal-700 font-medium transition">Products</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-teal-700 font-medium transition">How It Works</a>
            <a href="#education" className="text-gray-700 hover:text-teal-700 font-medium transition">Education</a>
            <a href="#about" className="text-gray-700 hover:text-teal-700 font-medium transition">About</a>
            <button
              onClick={onCartClick}
              className="relative text-gray-700 hover:text-teal-700 transition"
            >
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-4">
              <a href="#products" className="text-gray-700 hover:text-teal-700 font-medium transition">Products</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-teal-700 font-medium transition">How It Works</a>
              <a href="#education" className="text-gray-700 hover:text-teal-700 font-medium transition">Education</a>
              <a href="#about" className="text-gray-700 hover:text-teal-700 font-medium transition">About</a>
              <button
                onClick={onCartClick}
                className="flex items-center gap-2 text-gray-700 hover:text-teal-700 transition"
              >
                <ShoppingCart size={20} />
                <span>Cart ({cartItemCount})</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
