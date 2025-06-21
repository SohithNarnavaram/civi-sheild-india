
import React, { useState } from 'react';
import { Phone, Search, Plus, UserPlus, Shield, MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import EmergencyCard from './EmergencyCard';
import FamilyContactsSection from './FamilyContactsSection';
import { nationalNumbers, stateSpecialNumbers } from '@/data/emergencyNumbers';

const EmergencyNumbers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNonUrgent, setShowNonUrgent] = useState(true);
  const [callConfirmation, setCallConfirmation] = useState<{
    show: boolean;
    serviceName: string;
    number: string;
  }>({
    show: false,
    serviceName: '',
    number: ''
  });
  const [stateNumbersOpen, setStateNumbersOpen] = useState(false);

  const handleCallClick = (serviceName: string, number: string) => {
    setCallConfirmation({
      show: true,
      serviceName,
      number
    });
  };

  const confirmCall = () => {
    window.location.href = `tel:${callConfirmation.number}`;
    setCallConfirmation({ show: false, serviceName: '', number: '' });
  };

  const cancelCall = () => {
    setCallConfirmation({ show: false, serviceName: '', number: '' });
  };

  const filteredNationalNumbers = nationalNumbers.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.number.includes(searchTerm)
  );

  const filteredStateNumbers = stateSpecialNumbers.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.number.includes(searchTerm);
    const isUrgent = service.urgent !== false;
    return matchesSearch && (showNonUrgent || isUrgent);
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-navy mb-2">Emergency Numbers</h1>
        <p className="text-gray-600">Quick access to emergency services and your important contacts</p>
      </div>

      {/* Search and Controls */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search emergency services or numbers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowNonUrgent(!showNonUrgent)}
            className="text-sm"
          >
            {showNonUrgent ? 'Hide Non-Urgent' : 'Show All Numbers'}
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-6">
          {/* National Emergency Numbers */}
          <section>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-5 h-5 text-emergency" />
              <h2 className="text-xl font-semibold text-navy">🚨 National Numbers</h2>
            </div>
            <div className="grid gap-3">
              {filteredNationalNumbers.map((service, index) => (
                <EmergencyCard
                  key={index}
                  service={service}
                  onClick={() => handleCallClick(service.name, service.number)}
                />
              ))}
            </div>
          </section>

          {/* State/Special Numbers */}
          <section>
            <Collapsible open={stateNumbersOpen} onOpenChange={setStateNumbersOpen}>
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between cursor-pointer mb-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-disaster" />
                    <h2 className="text-xl font-semibold text-navy">📍 State & Special Numbers</h2>
                  </div>
                  <Button variant="ghost" size="sm">
                    {stateNumbersOpen ? '▼' : '▶'}
                  </Button>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid gap-3">
                  {filteredStateNumbers.map((service, index) => (
                    <EmergencyCard
                      key={index}
                      service={service}
                      onClick={() => handleCallClick(service.name, service.number)}
                    />
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </section>

          {/* Family & Friends Contacts */}
          <section>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-5 h-5 text-medical" />
              <h2 className="text-xl font-semibold text-navy">👨‍👩‍👧 Family & Friends</h2>
            </div>
            <FamilyContactsSection 
              searchTerm={searchTerm}
              onCallClick={handleCallClick}
            />
          </section>
        </div>
      </ScrollArea>

      {/* Call Confirmation Modal */}
      <Dialog open={callConfirmation.show} onOpenChange={() => setCallConfirmation({ show: false, serviceName: '', number: '' })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-emergency" />
              <span>Confirm Call</span>
            </DialogTitle>
            <DialogDescription className="text-center py-4">
              Do you want to call <strong>{callConfirmation.serviceName}</strong> at{' '}
              <strong className="text-emergency">{callConfirmation.number}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 justify-center">
            <Button variant="outline" onClick={cancelCall}>
              ❌ Cancel
            </Button>
            <Button onClick={confirmCall} className="bg-emergency hover:bg-emergency-dark text-white">
              ✅ Call Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmergencyNumbers;
