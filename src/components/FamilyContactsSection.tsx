
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import EmergencyCard from './EmergencyCard';

interface FamilyContact {
  id: string;
  name: string;
  number: string;
  relationship?: string;
}

interface FamilyContactsSectionProps {
  searchTerm: string;
  onCallClick: (name: string, number: string) => void;
}

const FamilyContactsSection: React.FC<FamilyContactsSectionProps> = ({ searchTerm, onCallClick }) => {
  const [contacts, setContacts] = useState<FamilyContact[]>([]);
  const [editingContact, setEditingContact] = useState<FamilyContact | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    relationship: ''
  });

  // Load contacts from localStorage on component mount
  useEffect(() => {
    const savedContacts = localStorage.getItem('familyEmergencyContacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  // Save contacts to localStorage whenever contacts change
  useEffect(() => {
    localStorage.setItem('familyEmergencyContacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = () => {
    if (formData.name && formData.number) {
      const newContact: FamilyContact = {
        id: Date.now().toString(),
        name: formData.name,
        number: formData.number,
        relationship: formData.relationship
      };
      setContacts([...contacts, newContact]);
      setFormData({ name: '', number: '', relationship: '' });
      setShowAddDialog(false);
    }
  };

  const handleEditContact = (contact: FamilyContact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      number: contact.number,
      relationship: contact.relationship || ''
    });
    setShowAddDialog(true);
  };

  const handleUpdateContact = () => {
    if (editingContact && formData.name && formData.number) {
      setContacts(contacts.map(contact =>
        contact.id === editingContact.id
          ? { ...contact, name: formData.name, number: formData.number, relationship: formData.relationship }
          : contact
      ));
      setEditingContact(null);
      setFormData({ name: '', number: '', relationship: '' });
      setShowAddDialog(false);
    }
  };

  const handleDeleteContact = (contactId: string) => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const closeDialog = () => {
    setShowAddDialog(false);
    setEditingContact(null);
    setFormData({ name: '', number: '', relationship: '' });
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.number.includes(searchTerm) ||
    (contact.relationship && contact.relationship.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Convert family contacts to emergency service format
  const contactsAsServices = filteredContacts.map(contact => ({
    name: contact.name,
    number: contact.number,
    icon: contact.relationship ? getRelationshipIcon(contact.relationship) : '👤',
    description: contact.relationship,
    urgent: true
  }));

  function getRelationshipIcon(relationship: string): string {
    const rel = relationship.toLowerCase();
    if (rel.includes('mother') || rel.includes('mom')) return '👩';
    if (rel.includes('father') || rel.includes('dad')) return '👨';
    if (rel.includes('spouse') || rel.includes('wife') || rel.includes('husband')) return '💑';
    if (rel.includes('child') || rel.includes('son') || rel.includes('daughter')) return '👶';
    if (rel.includes('sibling') || rel.includes('brother') || rel.includes('sister')) return '👫';
    if (rel.includes('friend')) return '👋';
    return '👤';
  }

  return (
    <div className="space-y-4">
      {/* Add Contact Button */}
      <Button
        onClick={() => setShowAddDialog(true)}
        className="w-full bg-medical hover:bg-medical-dark text-white"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Family/Friend Contact
      </Button>

      {/* Contacts List */}
      <div className="space-y-3">
        {contactsAsServices.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="p-8 text-center">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No family contacts added yet</p>
              <p className="text-sm text-gray-500 mt-2">Add your emergency contacts to call them quickly</p>
            </CardContent>
          </Card>
        ) : (
          filteredContacts.map((contact) => (
            <div key={contact.id} className="relative group">
              <EmergencyCard
                service={{
                  name: contact.name,
                  number: contact.number,
                  icon: contact.relationship ? getRelationshipIcon(contact.relationship) : '👤',
                  description: contact.relationship,
                  urgent: true
                }}
                onClick={() => onCallClick(contact.name, contact.number)}
              />
              {/* Edit and Delete buttons */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-md shadow-lg p-1 flex space-x-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditContact(contact);
                  }}
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteContact(contact.id);
                  }}
                  className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Contact Dialog */}
      <Dialog open={showAddDialog} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingContact ? 'Edit Contact' : 'Add Emergency Contact'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Name *</label>
              <Input
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number *</label>
              <Input
                placeholder="Enter phone number"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Relationship (Optional)</label>
              <Input
                placeholder="e.g., Mother, Father, Friend"
                value={formData.relationship}
                onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              onClick={editingContact ? handleUpdateContact : handleAddContact}
              className="bg-medical hover:bg-medical-dark text-white"
              disabled={!formData.name || !formData.number}
            >
              {editingContact ? 'Update' : 'Add'} Contact
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FamilyContactsSection;
