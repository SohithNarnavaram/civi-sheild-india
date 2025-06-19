
import React, { useState, useEffect } from 'react';
import TopNavBar from '@/components/TopNavBar';
import HeroBanner from '@/components/HeroBanner';
import AlertStrip from '@/components/AlertStrip';
import QuickPrompts from '@/components/QuickPrompts';
import ChatInterface from '@/components/ChatInterface';
import { translatePage, initializeTranslation } from '@/utils/translationService';

const Index = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    // Scroll to chat section
    document.getElementById('chat-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  useEffect(() => {
    // Initialize translation system
    initializeTranslation();

    // Listen for language changes
    const handleLanguageChange = (event: CustomEvent) => {
      const { language, translatePage: shouldTranslatePage } = event.detail;
      if (shouldTranslatePage) {
        translatePage(language);
      }
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <TopNavBar />
      
      {/* Alert Strip */}
      <AlertStrip />
      
      {/* Hero Section */}
      <HeroBanner />
      
      {/* Quick Prompts */}
      <QuickPrompts onPromptSelect={handlePromptSelect} />
      
      {/* Chat Interface */}
      <ChatInterface initialPrompt={selectedPrompt} />
      
      {/* Footer */}
      <footer className="bg-navy text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-emergency rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CS</span>
                </div>
                <span className="font-poppins font-bold text-xl">CIVI-SHIELD</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                AI-powered emergency response assistant for Indian citizens. 
                Available 24/7 in multiple languages with offline support.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4" data-translate="true">Emergency Contacts</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Police: 100</p>
                <p>Fire: 101</p>
                <p>Ambulance: 102</p>
                <p>Emergency: 112</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• Multilingual AI Assistant</p>
                <p>• Real-time Emergency Alerts</p>
                <p>• Offline First Aid Guides</p>
                <p>• Location-aware Services</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 CIVI-SHIELD. Built for Indian Citizens with ❤️</p>
            <p className="mt-2">
              This is an emergency assistance tool. For life-threatening emergencies, always call 112 immediately.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
