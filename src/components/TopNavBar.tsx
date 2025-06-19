
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Phone, Home, MessageSquare, Bell, Languages, MapPin, ChevronDown, Wifi, WifiOff, WifiLow } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface City {
  name: string;
  state: string;
  tier: number;
}

interface ConnectivityStatus {
  isOnline: boolean;
  connectionType: 'high' | 'low' | 'offline';
}

const TopNavBar = () => {
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  });
  const [selectedLocation, setSelectedLocation] = useState<City>({
    name: 'Delhi',
    state: 'Delhi',
    tier: 1
  });
  const [connectivity, setConnectivity] = useState<ConnectivityStatus>({
    isOnline: navigator.onLine,
    connectionType: 'high'
  });

  const languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' }
  ];

  const cities: City[] = [
    { name: 'Mumbai', state: 'Maharashtra', tier: 1 },
    { name: 'Delhi', state: 'Delhi', tier: 1 },
    { name: 'Bangalore', state: 'Karnataka', tier: 1 },
    { name: 'Hyderabad', state: 'Telangana', tier: 1 },
    { name: 'Chennai', state: 'Tamil Nadu', tier: 1 },
    { name: 'Kolkata', state: 'West Bengal', tier: 1 },
    { name: 'Pune', state: 'Maharashtra', tier: 1 },
    { name: 'Ahmedabad', state: 'Gujarat', tier: 1 },
    { name: 'Jaipur', state: 'Rajasthan', tier: 2 },
    { name: 'Surat', state: 'Gujarat', tier: 2 }
  ];

  const emergencyContacts = [
    { name: 'Police', number: '100', color: 'bg-emergency', icon: '🚓' },
    { name: 'Fire Brigade', number: '101', color: 'bg-emergency', icon: '🚒' },
    { name: 'Ambulance', number: '102', color: 'bg-medical', icon: '🚑' },
    { name: 'Emergency Helpline', number: '112', color: 'bg-disaster', icon: '🆘' },
    { name: 'Women Helpline', number: '1091', color: 'bg-emergency', icon: '👩' },
    { name: 'Child Helpline', number: '1098', color: 'bg-medical', icon: '👶' },
  ];

  // Monitor internet connectivity
  useEffect(() => {
    const updateConnectivity = () => {
      const isOnline = navigator.onLine;
      let connectionType: 'high' | 'low' | 'offline' = 'offline';
      
      if (isOnline) {
        // Check connection speed if available
        const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
        if (connection) {
          const effectiveType = connection.effectiveType;
          connectionType = (effectiveType === '4g' || effectiveType === '3g') ? 'high' : 'low';
        } else {
          connectionType = 'high'; // Default to high if can't detect
        }
      }
      
      setConnectivity({ isOnline, connectionType });
    };

    updateConnectivity();
    window.addEventListener('online', updateConnectivity);
    window.addEventListener('offline', updateConnectivity);

    return () => {
      window.removeEventListener('online', updateConnectivity);
      window.removeEventListener('offline', updateConnectivity);
    };
  }, []);

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    // Dispatch custom event for language change to translate entire page
    window.dispatchEvent(new CustomEvent('languageChange', { 
      detail: { 
        language: language.code, 
        languageData: language,
        translatePage: true 
      } 
    }));
  };

  const handleLocationChange = (city: City) => {
    setSelectedLocation(city);
    // Dispatch custom event for location change
    window.dispatchEvent(new CustomEvent('locationChange', { 
      detail: { location: city } 
    }));
  };

  const getConnectivityIcon = () => {
    if (!connectivity.isOnline) return <WifiOff className="w-4 h-4" />;
    if (connectivity.connectionType === 'low') return <WifiLow className="w-4 h-4" />;
    return <Wifi className="w-4 h-4" />;
  };

  const getConnectivityColor = () => {
    if (!connectivity.isOnline) return 'text-red-500';
    if (connectivity.connectionType === 'low') return 'text-yellow-500';
    return 'text-green-500';
  };

  const getConnectivityText = () => {
    if (!connectivity.isOnline) return 'Offline';
    if (connectivity.connectionType === 'low') return 'Slow';
    return 'Online';
  };

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
            <div className="hidden md:flex items-center space-x-4">
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
              
              {/* Connectivity Status */}
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-md border ${getConnectivityColor()} border-gray-200`}>
                {getConnectivityIcon()}
                <span className="text-xs font-medium">{getConnectivityText()}</span>
              </div>
              
              {/* Language Dropdown - Smaller Button */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-1 px-2 py-1 text-sm text-gray-700 hover:text-navy transition-colors border border-gray-200 rounded-md hover:bg-gray-50">
                    <Languages className="w-3 h-3" />
                    <span className="text-sm">{selectedLanguage.flag}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg z-50">
                  {languages.map((language) => (
                    <DropdownMenuItem
                      key={language.code}
                      onClick={() => handleLanguageChange(language)}
                      className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer"
                    >
                      <span className="text-lg">{language.flag}</span>
                      <div className="flex flex-col">
                        <span className="font-medium">{language.nativeName}</span>
                        <span className="text-sm text-gray-500">{language.name}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Location Dropdown - Smaller Button */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-1 px-2 py-1 text-sm text-gray-700 hover:text-navy transition-colors border border-gray-200 rounded-md hover:bg-gray-50">
                    <MapPin className="w-3 h-3" />
                    <span className="text-sm">{selectedLocation.name}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg z-50">
                  {cities.map((city) => (
                    <DropdownMenuItem
                      key={`${city.name}-${city.state}`}
                      onClick={() => handleLocationChange(city)}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{city.name}</span>
                        <span className="text-sm text-gray-500">{city.state}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        city.tier === 1 ? 'bg-medical text-white' : 'bg-disaster text-navy'
                      }`}>
                        Tier {city.tier}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
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
