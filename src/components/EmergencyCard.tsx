
import React from 'react';
import { Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EmergencyService {
  name: string;
  number: string;
  icon: string;
  urgent?: boolean;
  description?: string;
}

interface EmergencyCardProps {
  service: EmergencyService;
  onClick: () => void;
}

const EmergencyCard: React.FC<EmergencyCardProps> = ({ service, onClick }) => {
  const getCardStyle = () => {
    if (service.urgent === false) {
      return "border-gray-200 hover:border-gray-300";
    }
    return "border-emergency-light hover:border-emergency hover:shadow-md";
  };

  return (
    <Card className={`cursor-pointer transition-all duration-200 ${getCardStyle()}`} onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl flex-shrink-0">
              {service.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-navy truncate">{service.name}</h3>
              <p className="text-lg font-mono text-emergency font-bold">{service.number}</p>
              {service.description && (
                <p className="text-sm text-gray-600 truncate">{service.description}</p>
              )}
            </div>
          </div>
          <Button
            size="sm"
            className="bg-emergency hover:bg-emergency-dark text-white flex-shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <Phone className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyCard;
