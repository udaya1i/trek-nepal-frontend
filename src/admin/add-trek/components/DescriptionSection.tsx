import React, { useState } from 'react';
import { Button } from 'components/ui/Button';
import Input from 'components/ui/Input';
import { TrekFormData } from '../types';
import { FileText, Plus, Trash2 } from 'lucide-react';

interface DescriptionSectionProps {
  formData: TrekFormData;
  onChange: (field: keyof TrekFormData, value: any) => void;
  errors: Record<string, string>;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ formData, onChange, errors }) => {
  const [newHighlight, setNewHighlight] = useState('');
  const [newRequirement, setNewRequirement] = useState('');
  const [newIncluded, setNewIncluded] = useState('');
  const [newExcluded, setNewExcluded] = useState('');

  const handleAddItem = (field: keyof TrekFormData, value: string, setter: (val: string) => void) => {
    if (!value.trim()) return;
    const currentItems = (formData[field] as string[]) || [];
    onChange(field, [...currentItems, value.trim()]);
    setter('');
  };

  const handleRemoveItem = (field: keyof TrekFormData, index: number) => {
    const currentItems = (formData[field] as string[]) || [];
    onChange(field, currentItems.filter((_, i) => i !== index));
  };

  const renderListSection = (
    title: string,
    field: keyof TrekFormData,
    items: string[],
    newValue: string,
    setNewValue: (val: string) => void,
    placeholder: string
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{title}</label>
      
      {items?.length > 0 && (
        <div className="mb-3 space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="flex-1 text-sm">{item}</span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleRemoveItem(field, index)}
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Input
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder={placeholder}
          onKeyPress={(e) => e.key === 'Enter' && handleAddItem(field, newValue, setNewValue)}
        />
        <Button
          variant="secondary"
          onClick={() => handleAddItem(field, newValue, setNewValue)}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Trek Description & Details
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trek Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => onChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={6}
              placeholder="Provide a detailed description of the trek, including what makes it unique, terrain type, and overall experience..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {renderListSection(
            'Trek Highlights',
            'highlights',
            formData.highlights || [],
            newHighlight,
            setNewHighlight,
            'e.g., Stunning views of Mount Everest'
          )}

          {renderListSection(
            'Requirements & Prerequisites',
            'requirements',
            formData.requirements || [],
            newRequirement,
            setNewRequirement,
            'e.g., Good physical fitness required'
          )}

          {renderListSection(
            'Included Services',
            'includedServices',
            formData.includedServices || [],
            newIncluded,
            setNewIncluded,
            'e.g., Accommodation, meals, guide services'
          )}

          {renderListSection(
            'Excluded Services',
            'excludedServices',
            formData.excludedServices || [],
            newExcluded,
            setNewExcluded,
            'e.g., International flights, travel insurance'
          )}
        </div>
      </div>
    </div>
  );
};

export default DescriptionSection;