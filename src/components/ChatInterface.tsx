
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, Mic, MicOff, Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialPrompt }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  
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
    setIsLoading(true);

    // Simulate AI response with emergency-appropriate content
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText, selectedLanguage);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (query: string, language: string): Message => {
    const lowerQuery = query.toLowerCase();
    let response = '';
    let confidence = 0.9;

    // Emergency response logic
    if (lowerQuery.includes('fire')) {
      response = language === 'hi' 
        ? '🚨 आग के दौरान सुरक्षा के लिए: 1) तुरंत 101 पर कॉल करें 2) आग से दूर हटें 3) धुएं से बचने के लिए नीचे रहें 4) दरवाजे को छूकर गर्मी महसूस करें'
        : '🚨 Fire Safety Steps: 1) Call 101 immediately 2) Get away from the fire 3) Stay low to avoid smoke 4) Feel doors for heat before opening 5) Have an escape route planned';
    } else if (lowerQuery.includes('flood')) {
      response = language === 'hi'
        ? '🌊 बाढ़ की सुरक्षा: 1) ऊंची जगह पर जाएं 2) बिजली के उपकरणों से दूर रहें 3) 108 पर कॉल करें अगर फंस गए हों 4) बहते पानी में न चलें'
        : '🌊 Flood Safety: 1) Move to higher ground 2) Avoid electrical equipment 3) Call 108 if trapped 4) Don\'t walk in flowing water 5) Stay informed via radio/alerts';
    } else if (lowerQuery.includes('cpr') || lowerQuery.includes('unconscious')) {
      response = language === 'hi'
        ? '🫀 CPR के चरण: 1) 102 पर कॉल करें 2) व्यक्ति को सख्त सतह पर रखें 3) सीने के बीच में हाथ रखें 4) 100-120 BPM की रेट से दबाएं 5) 30 compressions फिर 2 rescue breaths'
        : '🫀 CPR Steps: 1) Call 102 immediately 2) Place person on firm surface 3) Put hands on center of chest 4) Push hard and fast 100-120 BPM 5) 30 compressions then 2 rescue breaths';
    } else if (lowerQuery.includes('police') || lowerQuery.includes('rights')) {
      response = language === 'hi'
        ? '👮 आपके अधिकार: 1) गिरफ्तारी का कारण जानने का अधिकार 2) वकील से मिलने का अधिकार 3) परिवार को सूचित करने का अधिकार 4) 24 घंटे में मजिस्ट्रेट के सामने पेश होने का अधिकार'
        : '👮 Your Rights: 1) Right to know reason for arrest 2) Right to legal counsel 3) Right to inform family 4) Right to be presented before magistrate within 24 hours 5) Right to remain silent';
    } else {
      response = language === 'hi'
        ? '🤖 मैं आपकी मदद के लिए यहां हूं। कृपया अपनी स्थिति के बारे में और बताएं ताकि मैं बेहतर सहायता प्रदान कर सकूं। आपातकाल के लिए 112 डायल करें।'
        : '🤖 I\'m here to help you. Please provide more details about your situation so I can assist you better. For immediate emergencies, dial 112.';
      confidence = 0.7;
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
    // For now, we'll just toggle the visual state
  };

  return (
    <section id="chat-section" className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-navy mb-4">
            AI Emergency Assistant
          </h2>
          <p className="text-lg text-gray-600">
            Get instant help in your preferred language. Available 24/7 with offline support.
          </p>
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
                <p>Start a conversation with CIVI-SHIELD AI</p>
                <p className="text-sm mt-2">Ask about emergencies, first aid, or legal rights</p>
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
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    {message.confidence && (
                      <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                        <span>Confidence: {Math.round(message.confidence * 100)}%</span>
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 border px-4 py-3 rounded-xl shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
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
              placeholder={selectedLanguage === 'hi' ? 'अपना सवाल यहाँ लिखें...' : 'Type your emergency question...'}
              className="pr-12 py-3 text-base rounded-xl border-2 focus:border-medical"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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
            disabled={!inputText.trim() || isLoading}
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
