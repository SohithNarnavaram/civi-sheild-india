
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
    'ta': 'அவசரநிலை',
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
};
