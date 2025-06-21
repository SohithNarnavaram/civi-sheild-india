
import { useState, useRef, useCallback } from 'react';

interface TextToSpeechHook {
  isSpeaking: boolean;
  isEnabled: boolean;
  speak: (text: string) => void;
  stop: () => void;
  toggleEnabled: () => void;
  isSupported: boolean;
}

export const useTextToSpeech = (): TextToSpeechHook => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const isSupported = 'speechSynthesis' in window;

  const speak = useCallback((text: string) => {
    if (!isSupported || !isEnabled || !text.trim()) return;

    // Stop any current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    // Set voice properties
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    // Use a female voice if available
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') || 
      voice.name.toLowerCase().includes('woman')
    );
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    window.speechSynthesis.speak(utterance);
  }, [isSupported, isEnabled]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const toggleEnabled = useCallback(() => {
    setIsEnabled(prev => !prev);
    if (isSpeaking) {
      stop();
    }
  }, [isSpeaking, stop]);

  return {
    isSpeaking,
    isEnabled,
    speak,
    stop,
    toggleEnabled,
    isSupported
  };
};
