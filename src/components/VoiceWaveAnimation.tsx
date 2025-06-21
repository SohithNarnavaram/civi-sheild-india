
import React from 'react';

interface VoiceWaveAnimationProps {
  isListening: boolean;
}

const VoiceWaveAnimation: React.FC<VoiceWaveAnimationProps> = ({ isListening }) => {
  if (!isListening) return null;

  return (
    <div className="flex justify-center items-center mt-4 space-x-1">
      <div className="text-emergency text-sm mr-3">🎤 Listening...</div>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-1 bg-emergency rounded-full wave-bar"
          style={{
            height: '20px',
            animation: `wave 1s ease-in-out infinite ${i * 0.1}s`
          }}
        />
      ))}
      <style jsx>{`
        @keyframes wave {
          0%, 40%, 100% {
            transform: scaleY(0.4);
          }
          20% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  );
};

export default VoiceWaveAnimation;
