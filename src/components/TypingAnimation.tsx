
import React, { useState, useEffect } from 'react';
import { translateText } from '@/utils/translationService';

interface TypingAnimationProps {
  language: string;
  onComplete?: () => void;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ language, onComplete }) => {
  const [dots, setDots] = useState('');
  const [showBadge, setShowBadge] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    // Auto-hide after 3 seconds
    const timeout = setTimeout(() => {
      setShowBadge(false);
      if (onComplete) onComplete();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  if (!showBadge) return null;

  const typingText = translateText('Emergency Officer is typing...', language);

  return (
    <div className="flex items-start mb-4 animate-fade-in">
      <div className="flex-shrink-0 w-8 h-8 bg-emergency rounded-full flex items-center justify-center mr-3">
        <span className="text-white text-xs font-bold">EO</span>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm max-w-xs">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">{typingText}</span>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-emergency rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-emergency rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-emergency rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingAnimation;
