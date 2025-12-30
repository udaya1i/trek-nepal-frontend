import Input from "components/ui/Input";
import { DifficultyLevel, TrekFormData } from "../types";
import Select from "components/ui/Select";
import Textarea from "components/ui/Textarea";

 
interface BasicInfoSectionProps {
  formData: TrekFormData;
  onChange: (field: keyof TrekFormData, value: string) => void;
  errors: Record<string, string>;
}

export const BasicInfoSection = ({ formData, onChange, errors }: BasicInfoSectionProps) => {
  const difficultyOptions = [
    { value: DifficultyLevel.EASY, label: 'Easy' },
    { value: DifficultyLevel.MODERATE, label: 'Moderate' },
    { value: DifficultyLevel.CHALLENGING, label: 'Challenging' },
    { value: DifficultyLevel.STRENUOUS, label: 'Strenuous' },
    { value: DifficultyLevel.EXTREME, label: 'Extreme' },
  ];

  const provinceOptions = [
    { value: 'Province 1', label: 'Province 1' },
    { value: 'Madhesh Province', label: 'Madhesh Province' },
    { value: 'Bagmati Province', label: 'Bagmati Province' },
    { value: 'Gandaki Province', label: 'Gandaki Province' },
    { value: 'Lumbini Province', label: 'Lumbini Province' },
    { value: 'Karnali Province', label: 'Karnali Province' },
    { value: 'Sudurpashchim Province', label: 'Sudurpashchim Province' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
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

          <Input
            label="Subtitle"
            value={formData.subtitle || ''}
            onChange={(e) => onChange('subtitle', e.target.value)}
            placeholder="e.g., Journey to the foot of the world's highest peak"
          />

          <Input
            label="Region"
            value={formData.region || ''}
            onChange={(e) => onChange('region', e.target.value)}
            placeholder="e.g., Everest Region"
          />

          <Select
            label="Difficulty Level"
            value={formData.difficultyLevel}
            onChange={(e) => onChange('difficultyLevel', e.target.value)}
            options={difficultyOptions}
            error={errors.difficultyLevel}
            required
          />

          <Input
            label="Duration"
            value={formData.durationDays}
            onChange={(e) => onChange('durationDays', e.target.value)}
            error={errors.durationDays}
            placeholder="e.g., 12-15 days"
            required
          />

          <Input
            label="Maximum Altitude (m)"
            type="number"
            value={formData.maxAltitude}
            onChange={(e) => onChange('maxAltitude', e.target.value)}
            error={errors.maxAltitude}
            placeholder="e.g., 5364"
            required
          />

          <Input
            label="Total Distance (km)"
            type="number"
            step="0.1"
            value={formData.totalDistance}
            onChange={(e) => onChange('totalDistance', e.target.value)}
            error={errors.totalDistance}
            placeholder="e.g., 130"
            required
          />

          <Input
            label="Highest Point (m)"
            type="number"
            value={formData.highestPoint}
            onChange={(e) => onChange('highestPoint', e.target.value)}
            error={errors.highestPoint}
            placeholder="e.g., 5545"
            required
          />

          <Input
            label="Lowest Point (m)"
            type="number"
            value={formData.lowestPoint}
            onChange={(e) => onChange('lowestPoint', e.target.value)}
            error={errors.lowestPoint}
            placeholder="e.g., 2800"
            required
          />

          <Input
            label="Starting Point"
            value={formData.startPoint}
            onChange={(e) => onChange('startPoint', e.target.value)}
            error={errors.startPoint}
            placeholder="e.g., Lukla"
            required
          />

          <Input
            label="End Point"
            value={formData.endPoint}
            onChange={(e) => onChange('endPoint', e.target.value)}
            error={errors.endPoint}
            placeholder="e.g., Lukla"
            required
          />

          <Input
            label="Best Season"
            value={formData.bestSeason}
            onChange={(e) => onChange('bestSeason', e.target.value)}
            error={errors.bestSeason}
            placeholder="e.g., March-May, September-November"
            required
          />

          <Select
            label="Province"
            value={formData.province}
            onChange={(e) => onChange('province', e.target.value)}
            options={provinceOptions}
            error={errors.province}
            required
          />

          <Input
            label="District"
            value={formData.district}
            onChange={(e) => onChange('district', e.target.value)}
            error={errors.district}
            placeholder="e.g., Solukhumbu"
            required
          />

          <Input
            label="Local Level"
            value={formData.localLevel}
            onChange={(e) => onChange('localLevel', e.target.value)}
            error={errors.localLevel}
            placeholder="e.g., Khumbu Pasang Lhamu"
            required
          />

          <Input
            label="Total Ascent (m)"
            type="number"
            value={formData.totalAscent}
            onChange={(e) => onChange('totalAscent', e.target.value)}
            placeholder="Optional"
          />

          <Input
            label="Total Descent (m)"
            type="number"
            value={formData.totalDescent}
            onChange={(e) => onChange('totalDescent', e.target.value)}
            placeholder="Optional"
          />

          <div className="md:col-span-2">
            <Textarea
              label="About Trek"
              value={formData.aboutTrek}
              onChange={(e) => onChange('aboutTrek', e.target.value)}
              error={errors.aboutTrek}
              rows={6}
              placeholder="Provide a detailed description of the trek..."
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};
