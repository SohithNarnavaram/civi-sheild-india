
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import EmergencyNumbers from '@/components/EmergencyNumbers';

const Emergency = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emergency rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🚨</span>
              </div>
              <h1 className="text-2xl font-bold text-navy">Emergency Numbers</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Emergency Numbers Content */}
      <div className="py-8">
        <EmergencyNumbers />
      </div>
    </div>
  );
};

export default Emergency;
