
import { useState, useRef, useCallback } from 'react';

interface TextToSpeechHook {
  isSpeaking: boolean;
  isPaused: boolean;
  isEnabled: boolean;
  speak: (text: string) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  toggleEnabled: () => void;
  isSupported: boolean;
}

export const useTextToSpeech = (): TextToSpeechHook => {
  const [isSpeaking, setI

speaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentTextRef = useRef<string>('');

  const isSupported = 'speechSynthesis' in window;

  const speak = useCallback((text: string) => {
    if (!isSupported || !isEnabled || !text.trim()) return;

    // Stop any current speech
    window.speechSynthesis.cancel();
    setIsPaused(false);

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    currentTextRef.current = text;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    
    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    // Set voice properties
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    // Use a female voice if available
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') || 
      voice.name.toLowerCase().includes('woman') ||
      voice.name.toLowerCase().includes('samantha') ||
      voice.name.toLowerCase().includes('zira')
    );
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    window.speechSynthesis.speak(utterance);
  }, [isSupported, isEnabled]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else if (currentTextRef.current && !isSpeaking) {
      // If speech ended but user wants to resume, restart from beginning
      speak(currentTextRef.current);
    }
  }, [speak, isSpeaking]);

  const toggleEnabled = useCallback(() => {
    setIsEnabled(prev => !prev);
    if (isSpeaking || isPaused) {
      stop();
    }
  }, [isSpeaking, isPaused, stop]);

  return {
    isSpeaking,
    isPaused,
    isEnabled,
    speak,
    stop,
    pause,
    resume,
    toggleEnabled,
    isSupported
  };
};
