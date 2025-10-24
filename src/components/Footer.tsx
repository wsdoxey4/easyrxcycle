import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-white mb-4">
              EasyRx<span className="text-teal-500">Cycle</span>
            </div>
            <p className="text-sm text-gray-400">
              Simplifying medical waste disposal with safe, compliant, and convenient mail-back solutions.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#sharps" className="hover:text-teal-400 transition">Sharps Disposal</a></li>
              <li><a href="#biohazard" className="hover:text-teal-400 transition">Biohazard Waste</a></li>
              <li><a href="#trace-chemo" className="hover:text-teal-400 transition">Trace Chemo Waste</a></li>
              <li><a href="#pharmaceutical" className="hover:text-teal-400 transition">Pharmaceutical Waste</a></li>
              <li><a href="#medical-waste" className="hover:text-teal-400 transition">Medical Waste Kits</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#education" className="hover:text-teal-400 transition">Educational Content</a></li>
              <li><a href="#compliance" className="hover:text-teal-400 transition">Compliance Guide</a></li>
              <li><a href="#faq" className="hover:text-teal-400 transition">FAQ</a></li>
              <li><a href="#blog" className="hover:text-teal-400 transition">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <a href="tel:5019042929" className="hover:text-teal-400 transition">501.904.2929</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <a href="mailto:info@easyrxcycle.com" className="hover:text-teal-400 transition">info@easyrxcycle.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Available Nationwide</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} EasyRxCycle. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#privacy" className="hover:text-teal-400 transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-teal-400 transition">Terms of Service</a>
            <a href="#shipping" className="hover:text-teal-400 transition">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
