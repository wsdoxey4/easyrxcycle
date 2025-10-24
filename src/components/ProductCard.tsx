import { ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const savings = product.compare_at_price
    ? ((product.compare_at_price - product.price) / product.compare_at_price * 100).toFixed(0)
    : null;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={product.image_urls[0] || 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=800'}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
        />
        {savings && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            Save {savings}%
          </div>
        )}
        {product.subscription_eligible && (
          <div className="absolute top-4 left-4 bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Auto-Ship Available
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="text-sm text-teal-600 font-semibold mb-2 uppercase tracking-wide">
          {product.waste_type.replace('-', ' ')}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.short_description}
        </p>

        {product.features.length > 0 && (
          <ul className="mb-4 space-y-1">
            {product.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <Check size={16} className="text-teal-600 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.compare_at_price && (
            <span className="text-lg text-gray-400 line-through">
              ${product.compare_at_price.toFixed(2)}
            </span>
          )}
        </div>

        {product.monthly_price && (
          <div className="text-sm text-gray-600 mb-4">
            or <span className="font-semibold text-teal-600">${product.monthly_price.toFixed(2)}/month</span> with auto-ship
          </div>
        )}

        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition flex items-center justify-center gap-2"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
