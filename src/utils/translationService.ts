
interface TranslationMap {
  [key: string]: {
    [languageCode: string]: string;
  };
}

const translations: TranslationMap = {
  // Navigation
  'Home': {
    'hi': 'होम',
    'kn': 'ಮನೆ',
    'ta': 'வீடு',
    'te': 'ఇల్లు',
    'mr': 'मुख्यपृष्ठ',
    'gu': 'ઘર',
    'bn': 'বাড়ি',
    'pa': 'ਘਰ',
    'ml': 'വീട്'
  },
  'AI Assistant': {
    'hi': 'एआई सहायक',
    'kn': 'ಎಐ ಸಹಾಯಕ',
    'ta': 'AI உதவியாளர்',
    'te': 'AI సహాయకుడు',
    'mr': 'एआय सहाय्यक',
    'gu': 'AI સહાયક',
    'bn': 'AI সহায়ক',
    'pa': 'AI ਸਹਾਇਕ',
    'ml': 'AI സഹായി'
  },
  'Alerts': {
    'hi': 'अलर्ट',
    'kn': 'ಎಚ್ಚರಿಕೆಗಳು',
    'ta': 'எச்சரிக்கைகள்',
    'te': 'హెచ్చరికలు',
    'mr': 'सावधानता',
    'gu': 'ચેતવણીઓ',
    'bn': 'সতর্কতা',
    'pa': 'ਚੇਤਾਵਨੀਆਂ',
    'ml': 'മുന്നറിയിപ്പുകൾ'
  },
  'Emergency': {
    'hi': 'आपातकाल',
    'kn': 'ತುರ್ತುಸ್ಥಿತಿ',
    'ta': 'அவسரநிலை',
    'te': 'అత్యవసర',
    'mr': 'आपत्काळ',
    'gu': 'કટોકટી',
    'bn': 'জরুরি',
    'pa': 'ਐਮਰਜੈਂਸੀ',
    'ml': 'അടിയന്തിര'
  },
  'Online': {
    'hi': 'ऑनलाइन',
    'kn': 'ಆನ್‌ಲೈನ್',
    'ta': 'ஆன்லைன்',
    'te': 'ఆన్‌లైన్',
    'mr': 'ऑनलाइन',
    'gu': 'ઓનલાઇન',
    'bn': 'অনলাইন',
    'pa': 'ਔਨਲਾਇਨ',
    'ml': 'ഓൺലൈൻ'
  },
  'Offline': {
    'hi': 'ऑफलाइन',
    'kn': 'ಆಫ್‌ಲೈನ್',
    'ta': 'ஆஃப்லைன்',
    'te': 'ఆఫ్‌లైన్',
    'mr': 'ऑफलाइन',
    'gu': 'ઓફલાઇન',
    'bn': 'অফলাইন',
    'pa': 'ਔਫਲਾਇਨ',
    'ml': 'ഓഫ്‌ലൈൻ'
  },
  'Slow': {
    'hi': 'धीमा',
    'kn': 'ನಿಧಾನ',
    'ta': 'மெதுவாக',
    'te': 'నెమ్మదిగా',
    'mr': 'हळु',
    'gu': 'ધીમું',
    'bn': 'ধীর',
    'pa': 'ਹੌਲੀ',
    'ml': 'പതുക്കെ'
  },
  // Chat Interface
  'AI Emergency Assistant': {
    'hi': 'एआई आपातकालीन सहायक',
    'kn': 'ಎಐ ತುರ್ತು ಸಹಾಯಕ',
    'ta': 'AI அவசர உதவியாளர்',
    'te': 'AI అత్యవసర సహాయకుడు',
    'mr': 'एआय आपत्कालीन सहाय्यक',
    'gu': 'AI કટોકટી સહાયક',
    'bn': 'AI জরুরি সহায়ক',
    'pa': 'AI ਐਮਰਜੈਂਸੀ ਸਹਾਇਕ',
    'ml': 'AI അടിയന്തിര സഹായി'
  },
  'Get instant help in your preferred language. Available 24/7 with offline support.': {
    'hi': 'अपनी पसंदीदा भाषा में तुरंत सहायता प्राप्त करें। ऑफलाइन समर्थन के साथ 24/7 उपलब्ध।',
    'kn': 'ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯಲ್ಲಿ ತ್ವರಿತ ಸಹಾಯ ಪಡೆಯಿರಿ। ಆಫ್‌ಲೈನ್ ಬೆಂಬಲದೊಂದಿಗೆ 24/7 ಲಭ್ಯವಿದೆ।',
    'ta': 'உங்கள் விருப்ப மொழியில் உடனடி உதவி பெறுங்கள். ஆஃப்லைன் ஆதரவுடன் 24/7 கிடைக்கும்।',
    'te': 'మీ ఇష్టమైన భాషలో తక్షణ సహాయం పొందండి. ఆఫ్‌లైన్ మద్దతుతో 24/7 అందుబాటులో ఉంది।',
    'mr': 'तुमच्या आवडत्या भाषेत त्वरित मदत मिळवा. ऑफलाइन समर्थनासह 24/7 उपलब्ध.',
    'gu': 'તમારી પસંદીદા ભાષામાં તાત્કાલિક મદદ મેળવો. ઓફલાઇન સપોર્ટ સાથે 24/7 ઉપલબ્ધ.',
    'bn': 'আপনার পছন্দের ভাষায় তাৎক্ষণিক সাহায্য পান। অফলাইন সাপোর্ট সহ 24/7 উপলব্ধ।',
    'pa': 'ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਵਿੱਚ ਤੁਰੰਤ ਮਦਦ ਪ੍ਰਾਪਤ ਕਰੋ। ਔਫਲਾਇਨ ਸਹਾਇਤਾ ਦੇ ਨਾਲ 24/7 ਉਪਲਬਧ।',
    'ml': 'നിങ്ങളുടെ ഇഷ്ടഭാഷയിൽ തൽക്ഷണ സഹായം നേടുക. ഓഫ്‌ലൈൻ പിന്തുണയോടെ 24/7 ലഭ്യമാണ്.'
  },
  'Start a conversation with CIVI-SHIELD AI': {
    'hi': 'CIVI-SHIELD AI के साथ बातचीत शुरू करें',
    'kn': 'CIVI-SHIELD AI ಯೊಂದಿಗೆ ಸಂಭಾಷಣೆ ಪ್ರಾರಂಭಿಸಿ',
    'ta': 'CIVI-SHIELD AI உடன் உரையாடலை தொடங்குங்கள்',
    'te': 'CIVI-SHIELD AI తో సంభాషణను ప్రారంభించండి',
    'mr': 'CIVI-SHIELD AI सोबत संभाषण सुरू करा',
    'gu': 'CIVI-SHIELD AI સાથે વાતચીત શરૂ કરો',
    'bn': 'CIVI-SHIELD AI এর সাথে কথোপকথন শুরু করুন',
    'pa': 'CIVI-SHIELD AI ਨਾਲ ਗੱਲਬਾਤ ਸ਼ੁਰੂ ਕਰੋ',
    'ml': 'CIVI-SHIELD AI യുമായി സംഭാഷണം ആരംഭിക്കുക'
  },
  'Ask about emergencies, first aid, or legal rights': {
    'hi': 'आपातकाल, प्राथमिक चिकित्सा, या कानूनी अधिकारों के बारे में पूछें',
    'kn': 'ತುರ್ತುಸ್ಥಿತಿ, ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ ಅಥವಾ ಕಾನೂನು ಹಕ್ಕುಗಳ ಬಗ್ಗೆ ಕೇಳಿ',
    'ta': 'அவசரநிலைகள், முதலுதவி அல்லது சட்ட உரிமைகள் பற்றி கேளுங்கள்',
    'te': 'అత్యవసర పరిస్థితులు, ప్రథమ చికిత్స లేదా చట్టపరమైన హక్కుల గురించి అడగండి',
    'mr': 'आपत्काळ, प्राथमिक उपचार किंवा कायदेशीर हक्कांबद्दल विचारा',
    'gu': 'કટોકટી, પ્રાથમિક સારવાર અથવા કાનૂની અધિકારો વિશે પૂછો',
    'bn': 'জরুরি অবস্থা, প্রাথমিক চিকিৎসা বা আইনি অধিকার সম্পর্কে জিজ্ঞাসা করুন',
    'pa': 'ਐਮਰਜੈਂਸੀ, ਫਸਟ ਏਡ, ਜਾਂ ਕਾਨੂੰਨੀ ਅਧਿਕਾਰਾਂ ਬਾਰੇ ਪੁੱਛੋ',
    'ml': 'അടിയന്തിര സാഹചര്യങ്ങൾ, പ്രഥമശുശ്രൂഷ അല്ലെങ്കിൽ നിയമപരമായ അവകാശങ്ങൾ കുറിച്ച് ചോദിക്കുക'
  },
  'Type your emergency question...': {
    'hi': 'अपना आपातकालीन प्रश्न लिखें...',
    'kn': 'ನಿಮ್ಮ ತುರ್ತು ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ...',
    'ta': 'உங்கள் அவசர கேள்வியை தட்டச்சு செய்யுங்கள்...',
    'te': 'మీ అత్యవసర ప్రశ్నను టైప్ చేయండి...',
    'mr': 'तुमचा आपत्कालीन प्रश्न टाइप करा...',
    'gu': 'તમારો કટોકટીનો પ્રશ્ન ટાઇપ કરો...',
    'bn': 'আপনার জরুরি প্রশ্ন টাইপ করুন...',
    'pa': 'ਆਪਣਾ ਐਮਰਜੈਂਸੀ ਸਵਾਲ ਟਾਈਪ ਕਰੋ...',
    'ml': 'നിങ്ങളുടെ അടിയന്തിര ചോദ്യം ടൈപ്പ് ചെയ്യുക...'
  },
  'Emergency Officer is typing...': {
    'hi': 'आपातकालीन अधिकारी टाइप कर रहे हैं...',
    'kn': 'ತುರ್ತು ಅಧಿಕಾರಿ ಟೈಪ್ ಮಾಡುತ್ತಿದ್ದಾರೆ...',
    'ta': 'அவசர அதிகாரி தட்டச்சு செய்கிறார்...',
    'te': 'అత్యవసర అధికారి టైప్ చేస్తున్నారు...',
    'mr': 'आपत्कालीन अधिकारी टाइप करत आहेत...',
    'gu': 'કટોકટી અધિકારી ટાઇપ કરી રહ્યા છે...',
    'bn': 'জরুরি কর্মকর্তা টাইপ করছেন...',
    'pa': 'ਐਮਰਜੈਂਸੀ ਅਫਸਰ ਟਾਈਪ ਕਰ ਰਿਹਾ ਹੈ...',
    'ml': 'അടിയന്തിര ഉദ്യോഗസ്ഥൻ ടൈപ്പ് ചെയ്യുന്നു...'
  },
  'Emergency Contacts': {
    'hi': 'आपातकालीन संपर्क',
    'kn': 'ತುರ್ತು ಸಂಪರ್ಕಗಳು',
    'ta': 'அவசர தொடர்புகள்',
    'te': 'అత్యవసర పరిచయాలు',
    'mr': 'आपत्कालीन संपर्क',
    'gu': 'કટોકટી સંપર્કો',
    'bn': 'জরুরি যোগাযোগ',
    'pa': 'ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ',
    'ml': 'അടിയന്തിര ബന്ധങ്ങൾ'
  },
  'Auto-detect': {
    'hi': 'स्वयं पहचानें',
    'kn': 'ಸ್ವಯಂ ಪತ್ತೆ',
    'ta': 'தானாக கண்டறி',
    'te': 'స్వయంగా గుర్తించు',
    'mr': 'स्वयं शोधा',
    'gu': 'આપોઆપ શોધો',
    'bn': 'স্বয়ংক্রিয় সনাক্তকরণ',
    'pa': 'ਆਪਣੇ ਆਪ ਖੋਜੋ',
    'ml': 'സ്വയം കണ്ടെത്തുക'
  },
  'Detecting...': {
    'hi': 'पहचान रहे हैं...',
    'kn': 'ಪತ್ತೆ ಮಾಡುತ್ತಿದೆ...',
    'ta': 'கண்டறிகிறது...',
    'te': 'గుర్తిస్తోంది...',
    'mr': 'शोधत आहे...',
    'gu': 'શોધી રહ્યું છે...',
    'bn': 'সনাক্ত করছে...',
    'pa': 'ਖੋਜ ਰਿਹਾ ਹੈ...',
    'ml': 'കണ്ടെത്തുന്നു...'
  }
};

export const translateText = (text: string, languageCode: string): string => {
  if (languageCode === 'en') return text;
  
  const translation = translations[text];
  if (translation && translation[languageCode]) {
    return translation[languageCode];
  }
  
  return text; // Return original text if translation not found
};

export const translatePage = (languageCode: string) => {
  // Get all text elements that should be translated
  const elementsToTranslate = document.querySelectorAll('[data-translate]');
  
  elementsToTranslate.forEach((element) => {
    const originalText = element.getAttribute('data-original-text') || element.textContent;
    if (originalText) {
      // Store original text if not already stored
      if (!element.getAttribute('data-original-text')) {
        element.setAttribute('data-original-text', originalText);
      }
      
      const translatedText = translateText(originalText, languageCode);
      element.textContent = translatedText;
    }
  });

  // Translate placeholders
  const inputElements = document.querySelectorAll('input[data-translate-placeholder]');
  inputElements.forEach((element) => {
    const input = element as HTMLInputElement;
    const originalPlaceholder = input.getAttribute('data-original-placeholder') || input.placeholder;
    if (originalPlaceholder) {
      if (!input.getAttribute('data-original-placeholder')) {
        input.setAttribute('data-original-placeholder', originalPlaceholder);
      }
      const translatedPlaceholder = translateText(originalPlaceholder, languageCode);
      input.placeholder = translatedPlaceholder;
    }
  });
};

// Add translation attributes to existing elements
export const initializeTranslation = () => {
  // This function can be called to add data-translate attributes to existing elements
  const navigationLinks = document.querySelectorAll('nav a span, nav button span');
  navigationLinks.forEach(element => {
    if (element.textContent) {
      element.setAttribute('data-translate', 'true');
    }
  });

  // Add attributes to common text elements
  const textElements = document.querySelectorAll('h1, h2, h3, p, span, button');
  textElements.forEach(element => {
    const text = element.textContent?.trim();
    if (text && translations[text]) {
      element.setAttribute('data-translate', 'true');
    }
  });

  // Add attributes to input placeholders
  const inputElements = document.querySelectorAll('input[placeholder]');
  inputElements.forEach(element => {
    const input = element as HTMLInputElement;
    if (input.placeholder && translations[input.placeholder]) {
      input.setAttribute('data-translate-placeholder', 'true');
    }
  });
};
