
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, Mic, MicOff, MapPin } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TypingAnimation from './TypingAnimation';
import { translateText } from '@/utils/translationService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  language?: string;
  confidence?: number;
}

interface ChatInterfaceProps {
  initialPrompt?: string;
}

interface LocationData {
  name: string;
  state: string;
  coordinates?: { lat: number; lng: number };
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialPrompt }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LocationData>({ name: 'Delhi', state: 'Delhi' });
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const languages = [
    { code: 'en', name: 'English', emoji: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', emoji: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', emoji: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', emoji: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', emoji: '🇮🇳' },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (initialPrompt && messages.length === 0) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  // Listen for location changes from TopNavBar
  useEffect(() => {
    const handleLocationChange = (event: CustomEvent) => {
      const { location } = event.detail;
      setCurrentLocation(location);
    };

    window.addEventListener('locationChange', handleLocationChange as EventListener);
    return () => {
      window.removeEventListener('locationChange', handleLocationChange as EventListener);
    };
  }, []);

  // Listen for language changes from TopNavBar
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      const { language } = event.detail;
      setSelectedLanguage(language);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  const detectLocation = async () => {
    setIsDetectingLocation(true);
    
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      setIsDetectingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Use reverse geocoding to get city name
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=demo&language=en&pretty=1`
          );
          const data = await response.json();
          
          if (data.results && data.results.length > 0) {
            const result = data.results[0];
            const cityName = result.components.city || result.components.town || result.components.village || 'Unknown';
            const stateName = result.components.state || 'Unknown';
            
            const detectedLocation: LocationData = {
              name: cityName,
              state: stateName,
              coordinates: { lat: latitude, lng: longitude }
            };
            
            setCurrentLocation(detectedLocation);
            
            // Dispatch event to notify other components
            window.dispatchEvent(new CustomEvent('locationChange', { 
              detail: { location: detectedLocation } 
            }));
          }
        } catch (error) {
          console.error('Error getting location name:', error);
          // Fallback to coordinates only
          setCurrentLocation({
            name: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
            state: 'GPS Location',
            coordinates: { lat: latitude, lng: longitude }
          });
        }
        
        setIsDetectingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to retrieve your location. Please check your browser settings.');
        setIsDetectingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
      language: selectedLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setShowTyping(true);

    try {
      const aiResponse = await generateGeminiResponse(messageText, selectedLanguage, currentLocation);
      setShowTyping(false);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      setShowTyping(false);
      // Fallback to local response
      const fallbackResponse = generateLocalResponse(messageText, selectedLanguage);
      setMessages(prev => [...prev, fallbackResponse]);
    }
  };

  const generateGeminiResponse = async (query: string, language: string, location: LocationData): Promise<Message> => {
    const apiKey = 'AIzaSyBc2NrwiERSaVUEIRqBJccENqAZHz8OPRI';
    
    const systemPrompt = `You are an Emergency Response Officer for Indian citizens. Your role is to:
    - Prioritize safety above all else
    - Guide users calmly and clearly in emergencies
    - Provide location-specific advice for ${location.name}, ${location.state}
    - Always assess urgency and confirm location when needed
    - Respond in ${language === 'en' ? 'English' : languages.find(l => l.code === language)?.name || 'English'}
    - For life-threatening emergencies, immediately direct to call 112
    - Provide specific local emergency contacts and services when relevant
    - Be concise but thorough in emergency guidance`;

    const userPrompt = `User location: ${location.name}, ${location.state}${location.coordinates ? ` (${location.coordinates.lat}, ${location.coordinates.lng})` : ''}
    User query: ${query}
    
    Please respond as an Emergency Response Officer.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${systemPrompt}\n\n${userPrompt}`
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            topK: 40,
            topP: 0.8,
            maxOutputTokens: 1000,
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, but I encountered an issue. For immediate emergencies, please call 112.';

      return {
        id: Date.now().toString(),
        text: aiText,
        sender: 'assistant',
        timestamp: new Date(),
        language,
        confidence: 0.95
      };
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
  };

  const generateLocalResponse = (query: string, language: string): Message => {
    const lowerQuery = query.toLowerCase();
    let response = '';
    let confidence = 0.9;

    // Emergency response logic with location context
    if (lowerQuery.includes('fire')) {
      response = language === 'hi' 
        ? `🚨 ${currentLocation.name} में आग के दौरान सुरक्षा: 1) तुरंत 101 पर कॉल करें 2) आग से दूर हटें 3) धुएं से बचने के लिए नीचे रहें 4) स्थानीय फायर स्टेशन: ${currentLocation.name} फायर स्टेशन`
        : `🚨 Fire Safety in ${currentLocation.name}: 1) Call 101 immediately 2) Get away from the fire 3) Stay low to avoid smoke 4) Local Fire Station: ${currentLocation.name} Fire Department`;
    } else if (lowerQuery.includes('flood')) {
      response = language === 'hi'
        ? `🌊 ${currentLocation.name} में बाढ़ की सुरक्षा: 1) ऊंची जगह पर जाएं 2) बिजली के उपकरणों से दूर रहें 3) 108 पर कॉल करें 4) स्थानीय प्राधिकरणों से संपर्क करें`
        : `🌊 Flood Safety in ${currentLocation.name}: 1) Move to higher ground 2) Avoid electrical equipment 3) Call 108 for rescue 4) Contact local ${currentLocation.name} disaster management`;
    } else if (lowerQuery.includes('police') || lowerQuery.includes('help')) {
      response = language === 'hi'
        ? `👮 ${currentLocation.name} में आपातकालीन सहायता: 1) पुलिस के लिए 100 डायल करें 2) आपातकाल के लिए 112 3) स्थानीय पुलिस स्टेशन: ${currentLocation.name} पुलिस स्टेशन 4) शांत रहें और अपना सटीक स्थान बताएं`
        : `👮 Emergency Help in ${currentLocation.name}: 1) Dial 100 for Police 2) Call 112 for Emergency 3) Local Police: ${currentLocation.name} Police Station 4) Stay calm and provide exact location`;
    } else {
      response = language === 'hi'
        ? `🤖 मैं ${currentLocation.name} के लिए आपातकालीन सहायता अधिकारी हूं। कृपया अपनी स्थिति बताएं। तत्काल आपातकाल के लिए 112 डायल करें।`
        : `🤖 I'm your Emergency Response Officer for ${currentLocation.name}. Please describe your situation. For immediate emergencies, dial 112.`;
      confidence = 0.8;
    }

    return {
      id: Date.now().toString(),
      text: response,
      sender: 'assistant',
      timestamp: new Date(),
      language,
      confidence
    };
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice input implementation would go here
  };

  return (
    <section id="chat-section" className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-navy mb-4" data-translate="true">
            AI Emergency Assistant
          </h2>
          <p className="text-lg text-gray-600" data-translate="true">
            Get instant help in your preferred language. Available 24/7 with offline support.
          </p>
        </div>

        {/* Location Display and GPS Button */}
        <div className="flex justify-center items-center mb-4 space-x-4">
          <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg">
            <MapPin className="w-4 h-4 text-emergency" />
            <span className="text-sm font-medium">{currentLocation.name}, {currentLocation.state}</span>
          </div>
          <Button
            onClick={detectLocation}
            disabled={isDetectingLocation}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <MapPin className="w-4 h-4" />
            <span>{isDetectingLocation ? 'Detecting...' : 'Auto-detect'}</span>
          </Button>
        </div>

        {/* Language Selector */}
        <div className="flex justify-center mb-6">
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <div className="flex items-center space-x-2">
                    <span>{lang.emoji}</span>
                    <span>{lang.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Chat Messages */}
        <div className="bg-gray-50 rounded-xl shadow-lg mb-6 h-96 overflow-y-auto chat-scroll p-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p data-translate="true">Start a conversation with CIVI-SHIELD AI</p>
                <p className="text-sm mt-2" data-translate="true">Ask about emergencies, first aid, or legal rights</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-medical text-white'
                        : 'bg-white text-gray-800 border'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                    {message.confidence && (
                      <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                        <span>Confidence: {Math.round(message.confidence * 100)}%</span>
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {showTyping && (
                <TypingAnimation 
                  language={selectedLanguage} 
                  onComplete={() => setShowTyping(false)} 
                />
              )}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={translateText('Type your emergency question...', selectedLanguage)}
              className="pr-12 py-3 text-base rounded-xl border-2 focus:border-medical"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              data-translate-placeholder="true"
            />
            <Button
              variant="ghost"
              size="sm"
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 ${
                isListening ? 'text-emergency' : 'text-gray-400'
              }`}
              onClick={toggleListening}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
          </div>
          <Button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || showTyping}
            className="bg-medical hover:bg-medical-dark text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Voice Recording Waveform (when listening) */}
        {isListening && (
          <div className="flex justify-center items-center mt-4 space-x-1">
            <div className="text-emergency text-sm mr-3">Listening...</div>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-emergency rounded-full wave-bar"
                style={{ height: '20px' }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ChatInterface;
