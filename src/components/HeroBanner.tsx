
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Phone, Bell } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-poppins font-bold text-navy mb-4">
            AI Emergency Buddy
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-medium">
            Anytime, Anywhere.
          </p>
        </div>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
          Get instant help during emergencies with our AI-powered assistant. 
          Available in multiple Indian languages with offline support and verified information.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg"
            className="bg-medical hover:bg-medical-dark text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
            onClick={() => document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Talk to Buddy
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-emergency text-emergency hover:bg-emergency hover:text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
          >
            <Phone className="w-5 h-5 mr-2" />
            Quick Help
          </Button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
          {[
            { icon: '🤖', title: 'AI Assistant', desc: 'Smart help' },
            { icon: '📍', title: 'Location-aware', desc: 'Local services' },
            { icon: '⚡', title: 'Offline-ready', desc: 'Works anywhere' },
            { icon: '🎯', title: 'Fact-checker', desc: 'Verified info' },
            { icon: '⚖️', title: 'Legal bot', desc: 'Know your rights' },
            { icon: '🏥', title: 'First Aid', desc: 'Life-saving tips' },
          ].map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h3 className="font-semibold text-navy text-sm">{feature.title}</h3>
              <p className="text-xs text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
