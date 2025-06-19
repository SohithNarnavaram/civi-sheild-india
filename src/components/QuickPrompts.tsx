
import React from 'react';
import { Button } from '@/components/ui/button';

interface QuickPromptsProps {
  onPromptSelect: (prompt: string) => void;
}

const QuickPrompts: React.FC<QuickPromptsProps> = ({ onPromptSelect }) => {
  const prompts = [
    {
      emoji: '🔥',
      title: 'House Fire',
      prompt: 'There is a fire in my house, what should I do immediately?',
      color: 'bg-emergency hover:bg-emergency-dark'
    },
    {
      emoji: '🌊',
      title: 'Flood',
      prompt: 'My area is flooding, how can I stay safe?',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      emoji: '🫀',
      title: 'CPR Help',
      prompt: 'Someone is unconscious and not breathing, how do I perform CPR?',
      color: 'bg-medical hover:bg-medical-dark'
    },
    {
      emoji: '👮',
      title: 'Legal Rights',
      prompt: 'I am being detained by police, what are my rights?',
      color: 'bg-navy hover:bg-navy-light'
    },
    {
      emoji: '🏥',
      title: 'Medical Emergency',
      prompt: 'Someone had a heart attack, what should I do while waiting for ambulance?',
      color: 'bg-medical hover:bg-medical-dark'
    },
    {
      emoji: '🌪️',
      title: 'Natural Disaster',
      prompt: 'There is an earthquake happening, how do I protect myself?',
      color: 'bg-disaster hover:bg-disaster-dark'
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-navy mb-4">
            Quick Emergency Help
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get instant guidance for common emergency situations. Click on any scenario below for immediate assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt, index) => (
            <Button
              key={index}
              onClick={() => onPromptSelect(prompt.prompt)}
              className={`${prompt.color} text-white p-6 h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 group`}
            >
              <div className="text-center w-full">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                  {prompt.emoji}
                </div>
                <h3 className="font-semibold text-lg mb-2">{prompt.title}</h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  Click for immediate guidance
                </p>
              </div>
            </Button>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm">
            Can't find your specific emergency? 
            <span className="text-medical font-semibold ml-1">
              Use the AI assistant below for personalized help.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuickPrompts;
