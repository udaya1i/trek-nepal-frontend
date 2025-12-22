import React, { useState } from 'react';
import Input from 'components/ui/Input';
import { Button } from 'components/ui/Button';
import { Checkbox } from 'components/ui/Checkbox';
import { TrekFormData, PermitInfo } from '../types';
import { FileCheck, Plus, Trash2 } from 'lucide-react';

interface PermitSectionProps {
  formData: TrekFormData;
  onChange: (field: keyof TrekFormData, value: any) => void;
  errors: Record<string, string>;
}

const PermitSection: React.FC<PermitSectionProps> = ({ formData, onChange, errors }) => {
  const [newPermit, setNewPermit] = useState<Partial<PermitInfo>>({
    name: '',
    cost: 0,
    issuingAuthority: '',
    processingTime: '',
    required: true,
  });

  const handleAddPermit = () => {
    if (!newPermit.name || !newPermit.issuingAuthority) return;

    const permit: PermitInfo = {
      id: Date.now().toString(),
      name: newPermit.name || '',
      cost: newPermit.cost || 0,
      issuingAuthority: newPermit.issuingAuthority || '',
      processingTime: newPermit.processingTime || '',
      required: newPermit.required !== undefined ? newPermit.required : true,
    };

    onChange('permits', [...(formData.permits || []), permit]);
    setNewPermit({
      name: '',
      cost: 0,
      issuingAuthority: '',
      processingTime: '',
      required: true,
    });
  };

  const handleRemovePermit = (id: string) => {
    const updatedPermits = (formData.permits || []).filter(p => p.id !== id);
    onChange('permits', updatedPermits);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-blue-600" />
          Permit Information
        </h3>

        {(formData.permits || []).length > 0 && (
          <div className="mb-6 space-y-3">
            {(formData.permits || []).map((permit) => (
              <div key={permit.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">{permit.name}</h4>
                      {permit.required && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      Issued by: {permit.issuingAuthority}
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleRemovePermit(permit.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                  <div>
                    <span className="text-gray-600">Cost:</span>
                    <span className="ml-1 font-medium">${permit.cost}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Processing Time:</span>
                    <span className="ml-1 font-medium">{permit.processingTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="border-t pt-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Add Permit</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Permit Name"
                value={newPermit.name || ''}
                onChange={(e) => setNewPermit({ ...newPermit, name: e.target.value })}
                placeholder="e.g., TIMS Card, Sagarmatha National Park Permit"
              />
              <Input
                label="Issuing Authority"
                value={newPermit.issuingAuthority || ''}
                onChange={(e) => setNewPermit({ ...newPermit, issuingAuthority: e.target.value })}
                placeholder="e.g., Nepal Tourism Board"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Cost (USD)"
                type="number"
                value={newPermit.cost?.toString() || ''}
                onChange={(e) => setNewPermit({ ...newPermit, cost: parseFloat(e.target.value) || 0 })}
                placeholder="e.g., 20"
                min="0"
              />
              <Input
                label="Processing Time"
                value={newPermit.processingTime || ''}
                onChange={(e) => setNewPermit({ ...newPermit, processingTime: e.target.value })}
                placeholder="e.g., 1-2 days, Same day"
              />
            </div>

            <Checkbox
              label="Required Permit"
              checked={newPermit.required !== undefined ? newPermit.required : true}
              onChange={(e) => setNewPermit({ ...newPermit, required: e.target.checked })}
            />

            <Button variant="secondary" onClick={handleAddPermit}>
              <Plus className="w-4 h-4 mr-2" />
              Add Permit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermitSection;