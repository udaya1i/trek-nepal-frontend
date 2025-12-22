import React from 'react';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';
import { TrekFormData } from '../types';
import { DollarSign } from 'lucide-react';

interface PricingSectionProps {
  formData: TrekFormData;
  onChange: (field: keyof TrekFormData, value: any) => void;
  errors: Record<string, string>;
}

const PricingSection: React.FC<PricingSectionProps> = ({ formData, onChange, errors }) => {
  const currencyOptions = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'NPR', label: 'NPR - Nepali Rupee' },
  ];

  const handlePriceChange = (field: string, value: any) => {
    onChange('price', {
      ...formData.price,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-blue-600" />
          Pricing Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Minimum Price"
            type="number"
            value={formData.price?.min?.toString() || ''}
            onChange={(e) => handlePriceChange('min', parseFloat(e.target.value) || 0)}
            error={errors['price.min']}
            placeholder="e.g., 1200"
            min="0"
            step="0.01"
            required
          />

          <Input
            label="Maximum Price"
            type="number"
            value={formData.price?.max?.toString() || ''}
            onChange={(e) => handlePriceChange('max', parseFloat(e.target.value) || 0)}
            error={errors['price.max']}
            placeholder="e.g., 1800"
            min="0"
            step="0.01"
            required
          />

          <Select
            label="Currency"
            value={formData.price?.currency || 'USD'}
            onChange={(e) => handlePriceChange('currency', e.target.value)}
            options={currencyOptions}
            required
          />
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Pricing Tip:</strong> Set a price range to accommodate different service levels 
            (budget, standard, luxury). The minimum price should cover basic trek services, while 
            the maximum can include premium amenities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;