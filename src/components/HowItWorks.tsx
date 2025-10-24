import { Package, Trash2, Mail, CheckCircle } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Package,
      title: 'Order Your Kit',
      description: 'Choose the right disposal system for your needs. We ship it directly to your door with everything included.',
      color: 'teal'
    },
    {
      icon: Trash2,
      title: 'Fill Safely',
      description: 'Use our compliant containers to safely collect sharps, biohazard, or pharmaceutical waste. All containers meet DOT regulations.',
      color: 'blue'
    },
    {
      icon: Mail,
      title: 'Mail It Back',
      description: 'When full, seal the container using the integrated closure and use the prepaid shipping label. Drop off at any USPS location.',
      color: 'green'
    },
    {
      icon: CheckCircle,
      title: 'We Handle Disposal',
      description: 'We ensure proper treatment and disposal at EPA-permitted facilities. You receive a certificate of destruction for your records.',
      color: 'teal'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our simple 4-step process makes medical waste disposal safe, compliant, and hassle-free
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className={`bg-${step.color}-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative`}>
                    <Icon className={`text-${step.color}-600`} size={40} />
                    <div className="absolute -top-2 -right-2 bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gray-200 -translate-x-1/2" style={{ width: 'calc(100% - 5rem)' }} />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-teal-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help Choosing?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our team of compliance experts is ready to help you select the right disposal solution for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5019042929" className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition">
              Call 501.904.2929
            </a>
            <a href="mailto:info@easyrxcycle.com" className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition border-2 border-teal-600">
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
