import { BookOpen, Shield, FileText, AlertCircle } from 'lucide-react';

export default function EducationalSection() {
  const topics = [
    {
      icon: Shield,
      title: 'OSHA Compliance',
      description: 'Learn about OSHA bloodborne pathogen standards and how our products help you maintain compliance.',
      link: '#osha'
    },
    {
      icon: FileText,
      title: 'EPA Regulations',
      description: 'Understand EPA regulations for medical waste disposal and proper handling procedures.',
      link: '#epa'
    },
    {
      icon: AlertCircle,
      title: 'USP 800 Guidelines',
      description: 'Stay compliant with USP 800 standards for handling hazardous drugs and trace chemotherapy waste.',
      link: '#usp800'
    },
    {
      icon: BookOpen,
      title: 'DEA Requirements',
      description: 'Navigate DEA requirements for pharmaceutical waste disposal with our compliant solutions.',
      link: '#dea'
    }
  ];

  return (
    <section id="education" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Education & Compliance</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed about regulations and best practices for medical waste disposal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {topics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <a
                key={index}
                href={topic.link}
                className="bg-gradient-to-br from-teal-50 to-blue-50 p-6 rounded-xl hover:shadow-lg transition group"
              >
                <div className="bg-teal-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.title}</h3>
                <p className="text-gray-600 text-sm">{topic.description}</p>
              </a>
            );
          })}
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Comprehensive Compliance Resources</h3>
              <p className="text-gray-300 mb-6">
                Access our library of guides, videos, and documentation to ensure your facility maintains full compliance with all federal and state regulations.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                  <span>Step-by-step disposal guides</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                  <span>Training materials for staff</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                  <span>Certificate of destruction</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                  <span>Regulatory updates</span>
                </li>
              </ul>
              <a
                href="#resources"
                className="inline-block bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-500 transition"
              >
                Access Resources
              </a>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/5726794/pexels-photo-5726794.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Medical compliance documentation"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
