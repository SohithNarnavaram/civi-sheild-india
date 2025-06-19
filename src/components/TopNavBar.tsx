
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Phone, Home, MessageSquare, Bell } from 'lucide-react';

const TopNavBar = () => {
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  const emergencyContacts = [
    { name: 'Police', number: '100', color: 'bg-emergency', icon: '🚓' },
    { name: 'Fire Brigade', number: '101', color: 'bg-emergency', icon: '🚒' },
    { name: 'Ambulance', number: '102', color: 'bg-medical', icon: '🚑' },
    { name: 'Emergency Helpline', number: '112', color: 'bg-disaster', icon: '🆘' },
    { name: 'Women Helpline', number: '1091', color: 'bg-emergency', icon: '👩' },
    { name: 'Child Helpline', number: '1098', color: 'bg-medical', icon: '👶' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emergency rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CS</span>
              </div>
              <span className="font-poppins font-bold text-xl text-navy">CIVI-SHIELD</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="flex items-center space-x-1 text-gray-700 hover:text-navy transition-colors">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </a>
              <a href="#assistant" className="flex items-center space-x-1 text-gray-700 hover:text-navy transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span>AI Assistant</span>
              </a>
              <a href="#alerts" className="flex items-center space-x-1 text-gray-700 hover:text-navy transition-colors">
                <Bell className="w-4 h-4" />
                <span>Alerts</span>
              </a>
            </div>

            {/* Emergency Button */}
            <Sheet open={isEmergencyOpen} onOpenChange={setIsEmergencyOpen}>
              <SheetTrigger asChild>
                <Button className="bg-emergency hover:bg-emergency-dark text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white">
                <SheetTitle className="text-xl font-poppins font-bold text-navy mb-6">
                  Emergency Contacts
                </SheetTitle>
                <div className="space-y-4">
                  {emergencyContacts.map((contact, index) => (
                    <div
                      key={index}
                      className={`${contact.color} text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer`}
                      onClick={() => window.open(`tel:${contact.number}`, '_self')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{contact.icon}</span>
                          <div>
                            <h3 className="font-semibold">{contact.name}</h3>
                            <p className="text-sm opacity-90">Tap to call</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">{contact.number}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 text-center">
                    In case of emergency, stay calm and provide clear location details when calling.
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopNavBar;
