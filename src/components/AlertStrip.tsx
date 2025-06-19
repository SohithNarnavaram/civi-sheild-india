
import React, { useState, useEffect } from 'react';
import { Bell, X, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AlertStrip = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'weather',
      severity: 'high',
      title: 'Heavy Rainfall Alert',
      message: 'Heavy rainfall expected in Bangalore. Avoid low-lying areas.',
      location: 'Bangalore, Karnataka',
      timestamp: new Date(),
      active: true
    },
    {
      id: 2,
      type: 'traffic',
      severity: 'medium',
      title: 'Road Closure',
      message: 'Major traffic disruption on Ring Road due to waterlogging.',
      location: 'Delhi NCR',
      timestamp: new Date(),
      active: true
    }
  ]);

  const [currentAlert, setCurrentAlert] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const activeAlerts = alerts.filter(alert => alert.active);

  useEffect(() => {
    if (activeAlerts.length > 1) {
      const interval = setInterval(() => {
        setCurrentAlert((prev) => (prev + 1) % activeAlerts.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeAlerts.length]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-emergency text-white';
      case 'medium': return 'bg-disaster text-navy';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const dismissAlert = (alertId: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, active: false } : alert
    ));
  };

  if (!isVisible || activeAlerts.length === 0) {
    return null;
  }

  const alert = activeAlerts[currentAlert];

  return (
    <div className={`${getSeverityColor(alert.severity)} py-3 px-4 relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              {alert.severity === 'high' ? (
                <Bell className="w-5 h-5 animate-pulse" />
              ) : (
                <Bell className="w-5 h-5" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{alert.title}</p>
                  <p className="text-sm opacity-90 truncate">{alert.message}</p>
                </div>
                
                <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                  <MapPin className="w-4 h-4 opacity-75" />
                  <span className="text-sm font-medium">{alert.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            {activeAlerts.length > 1 && (
              <div className="hidden sm:flex items-center space-x-1">
                {activeAlerts.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentAlert ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-white/20"
              onClick={() => dismissAlert(alert.id)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Animated progress bar for auto-rotation */}
      {activeAlerts.length > 1 && (
        <div className="absolute bottom-0 left-0 h-1 bg-white/30 w-full">
          <div 
            className="h-full bg-white transition-all duration-[5000ms] ease-linear"
            style={{ 
              width: '100%',
              animation: 'progress 5s linear infinite'
            }}
          />
        </div>
      )}
      
      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default AlertStrip;
