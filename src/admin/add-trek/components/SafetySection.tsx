import React, { useState } from 'react';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';
import { Checkbox } from 'components/ui/Checkbox';
import { Button } from 'components/ui/Button';
import { TrekFormData } from '../types';
import { Shield, Plus, Trash2 } from 'lucide-react';

interface SafetySectionProps {
  formData: TrekFormData;
  onChange: (field: keyof TrekFormData, value: any) => void;
  errors: Record<string, string>;
}

const SafetySection: React.FC<SafetySectionProps> = ({ formData, onChange, errors }) => {
  const [newContact, setNewContact] = useState('');

  const riskLevelOptions = [
    { value: 'Low', label: 'Low - Minimal risk, suitable for most trekkers' },
    { value: 'Medium', label: 'Medium - Moderate risk, good health required' },
    { value: 'High', label: 'High - Significant risk, excellent health needed' },
    { value: 'Extreme', label: 'Extreme - High altitude, expert level only' },
  ];

  const handleSafetyChange = (field: string, value: any) => {
    onChange('safety', {
      ...formData.safety,
      [field]: value,
    });
  };

  const handleAddContact = () => {
    if (!newContact.trim()) return;
    
    const updatedContacts = [...(formData.safety?.emergencyContacts || []), newContact.trim()];
    handleSafetyChange('emergencyContacts', updatedContacts);
    setNewContact('');
  };

  const handleRemoveContact = (index: number) => {
    const updatedContacts = (formData.safety?.emergencyContacts || []).filter((_, i) => i !== index);
    handleSafetyChange('emergencyContacts', updatedContacts);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          Safety Information
        </h3>

        <div className="space-y-6">
          <Select
            label="Risk Level"
            value={formData.safety?.riskLevel || 'Medium'}
            onChange={(e) => handleSafetyChange('riskLevel', e.target.value)}
            options={riskLevelOptions}
            error={errors['safety.riskLevel']}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Experience Level <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.safety?.requiredExperience || ''}
              onChange={(e) => handleSafetyChange('requiredExperience', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Describe the experience level required for this trek..."
            />
            {errors['safety.requiredExperience'] && (
              <p className="mt-1 text-sm text-red-600">{errors['safety.requiredExperience']}</p>
            )}
          </div>

          <div>
            <Checkbox
              label="Medical Facilities Available Along Route"
              checked={formData.safety?.medicalFacilities || false}
              onChange={(e) => handleSafetyChange('medicalFacilities', e.target.checked)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Contacts
            </label>
            
            {(formData.safety?.emergencyContacts || []).length > 0 && (
              <div className="mb-3 space-y-2">
                {(formData.safety?.emergencyContacts || []).map((contact, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="flex-1 text-sm font-medium">{contact}</span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleRemoveContact(index)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Input
                value={newContact}
                onChange={(e) => setNewContact(e.target.value)}
                placeholder="e.g., Nepal Police: +977-100 or Rescue Helicopter: +977-1234567"
                onKeyPress={(e) => e.key === 'Enter' && handleAddContact()}
              />
              <Button
                variant="secondary"
                onClick={handleAddContact}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetySection;