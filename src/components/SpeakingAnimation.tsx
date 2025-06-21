
import React from 'react';

interface SpeakingAnimationProps {
  isActive: boolean;
}

const SpeakingAnimation: React.FC<SpeakingAnimationProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="flex items-center justify-center space-x-1 py-2">
      <div className="flex items-center space-x-1">
        <div className="text-medical text-sm mr-3">🤖 Speaking...</div>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-medical rounded-full speaking-bar"
            style={{
              height: '20px',
              animation: `speaking 1.2s ease-in-out infinite ${i * 0.1}s`
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes speaking {
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

export default SpeakingAnimation;
