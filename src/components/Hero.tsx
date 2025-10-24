import { ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-teal-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Safe & Compliant Medical Waste Disposal
              <span className="text-teal-600"> Made Simple</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              Convenient mail-back solutions for sharps, biohazard, trace chemo, pharmaceutical, and medical waste.
              EPA, OSHA, and DOT compliant. Delivered to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#products"
                className="bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-teal-700 transition text-center shadow-lg"
              >
                Shop Products
              </a>
              <a
                href="#how-it-works"
                className="bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition text-center border-2 border-teal-600"
              >
                How It Works
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="text-teal-600" size={32} />
                </div>
                <div className="font-semibold text-gray-900">EPA Compliant</div>
                <div className="text-sm text-gray-600">Fully certified</div>
              </div>
              <div className="text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Truck className="text-teal-600" size={32} />
                </div>
                <div className="font-semibold text-gray-900">Free Shipping</div>
                <div className="text-sm text-gray-600">On orders $50+</div>
              </div>
              <div className="text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <RefreshCw className="text-teal-600" size={32} />
                </div>
                <div className="font-semibold text-gray-900">Auto-Ship</div>
                <div className="text-sm text-gray-600">Never run out</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/6823567/pexels-photo-6823567.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Sharps mail-back disposal box with red sharps container"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-xs">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <ShieldCheck className="text-green-600" size={24} />
                </div>
                <div>
                  <div className="font-bold text-gray-900">100% Compliant</div>
                  <div className="text-sm text-gray-600">OSHA, EPA, DOT certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
