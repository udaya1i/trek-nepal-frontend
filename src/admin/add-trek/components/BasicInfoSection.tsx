import React from 'react';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';
import { Checkbox } from 'components/ui/Checkbox';
import { TrekFormData } from '../types';
import { Mountain } from 'lucide-react';

interface BasicInfoSectionProps {
  formData: TrekFormData;
  onChange: (field: keyof TrekFormData, value: any) => void;
  errors: Record<string, string>;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ formData, onChange, errors }) => {
  const difficultyOptions = [
    { value: 'Easy', label: 'Easy - Suitable for beginners' },
    { value: 'Moderate', label: 'Moderate - Some trekking experience required' },
    { value: 'Challenging', label: 'Challenging - Good fitness level needed' },
    { value: 'Strenuous', label: 'Strenuous - High fitness and experience required' },
    { value: 'Extreme', label: 'Extreme - Expert level only' },
  ];

  const regionOptions = [
    { value: 'Everest', label: 'Everest Region' },
    { value: 'Annapurna', label: 'Annapurna Region' },
    { value: 'Langtang', label: 'Langtang Region' },
    { value: 'Manaslu', label: 'Manaslu Region' },
    { value: 'Mustang', label: 'Mustang Region' },
    { value: 'Dolpo', label: 'Dolpo Region' },
    { value: 'Kanchenjunga', label: 'Kanchenjunga Region' },
  ];

  const seasonOptions = ['Spring', 'Summer', 'Autumn', 'Winter'];

  const handleSeasonToggle = (season: string) => {
    const currentSeasons = formData.bestSeason || [];
    const updatedSeasons = currentSeasons.includes(season)
      ? currentSeasons.filter(s => s !== season)
      : [...currentSeasons, season];
    onChange('bestSeason', updatedSeasons);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Mountain className="w-5 h-5 text-blue-600" />
          Basic Trek Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Input
              label="Trek Name"
              value={formData.name}
              onChange={(e) => onChange('name', e.target.value)}
              error={errors.name}
              placeholder="e.g., Everest Base Camp Trek"
              required
            />
          </div>

          <Select
            label="Region"
            value={formData.region}
            onChange={(e) => onChange('region', e.target.value)}
            options={regionOptions}
            error={errors.region}
            required
          />

          <Select
            label="Difficulty Level"
            value={formData.difficulty}
            onChange={(e) => onChange('difficulty', e.target.value)}
            options={difficultyOptions}
            error={errors.difficulty}
            required
          />

          <Input
            label="Duration (Days)"
            type="number"
            value={formData.duration?.toString() || ''}
            onChange={(e) => onChange('duration', parseInt(e.target.value) || 0)}
            error={errors.duration}
            min="1"
            required
          />

          <Input
            label="Maximum Altitude (meters)"
            type="number"
            value={formData.maxAltitude?.toString() || ''}
            onChange={(e) => onChange('maxAltitude', parseInt(e.target.value) || 0)}
            error={errors.maxAltitude}
            placeholder="e.g., 5364"
            min="0"
            required
          />

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Best Season <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-4">
              {seasonOptions.map((season) => (
                <Checkbox
                  key={season}
                  label={season}
                  checked={(formData.bestSeason || []).includes(season)}
                  onChange={() => handleSeasonToggle(season)}
                />
              ))}
            </div>
            {errors.bestSeason && (
              <p className="mt-1 text-sm text-red-600">{errors.bestSeason}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <Checkbox
              label="Permit Required"
              checked={formData.permitRequired || false}
              onChange={(e) => onChange('permitRequired', e.target.checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoSection;