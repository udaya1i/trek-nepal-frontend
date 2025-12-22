import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { AlertType, AlertSeverity } from '../types';
import Icon from 'components/ui/AppIcon';

interface CreateAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (alertData: any) => void;
}

const CreateAlertModal = ({ isOpen, onClose, onSubmit }: CreateAlertModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'general' as AlertType,
    severity: 'medium' as AlertSeverity,
    affectedRegions: [] as string[],
    affectedTrails: [] as string[],
    expiresIn: '24',
    sendNotifications: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const alertTypes = [
    { value: 'weather', label: 'Weather Warning' },
    { value: 'trail_closure', label: 'Trail Closure' },
    { value: 'landslide', label: 'Landslide Risk' },
    { value: 'emergency', label: 'Emergency Alert' },
    { value: 'general', label: 'General Advisory' },
  ];

  const severityLevels = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'critical', label: 'Critical - Immediate Action' },
  ];

  const regions = [
    { value: 'everest', label: 'Everest Region' },
    { value: 'annapurna', label: 'Annapurna Region' },
    { value: 'langtang', label: 'Langtang Region' },
    { value: 'manaslu', label: 'Manaslu Region' },
    { value: 'mustang', label: 'Mustang Region' },
  ];

  const trails = [
    { value: 'ebc', label: 'Everest Base Camp' },
    { value: 'abc', label: 'Annapurna Base Camp' },
    { value: 'langtang-valley', label: 'Langtang Valley' },
    { value: 'manaslu-circuit', label: 'Manaslu Circuit' },
    { value: 'upper-mustang', label: 'Upper Mustang' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.affectedRegions.length === 0) newErrors.affectedRegions = 'Select at least one region';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-lg shadow-elevation-5 border border-border">
        <div className="sticky top-0 flex items-center justify-between p-4 md:p-6 border-b border-border bg-card">
          <h2 className="text-xl md:text-2xl font-heading font-semibold">Create Safety Alert</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-smooth focus-ring"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
          <Input
            label="Alert Title"
            type="text"
            placeholder="Brief description of the alert"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            error={errors.title}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Alert Type"
              options={alertTypes}
              value={formData.type}
              onChange={(value) => setFormData({ ...formData, type: value as AlertType })}
              required
            />

            <Select
              label="Severity Level"
              options={severityLevels}
              value={formData.severity}
              onChange={(value) => setFormData({ ...formData, severity: value as AlertSeverity })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Description <span className="text-error">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed information about the safety concern..."
              rows={4}
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-card focus-ring resize-none"
            />
            {errors.description && (
              <p className="text-xs text-error caption">{errors.description}</p>
            )}
          </div>

          <Select
            label="Affected Regions"
            description="Select all regions impacted by this alert"
            options={regions}
            value={formData.affectedRegions}
            onChange={(value) => setFormData({ ...formData, affectedRegions: value as string[] })}
            error={errors.affectedRegions}
            multiple
            searchable
            required
          />

          <Select
            label="Affected Trails"
            description="Select specific trails if applicable"
            options={trails}
            value={formData.affectedTrails}
            onChange={(value) => setFormData({ ...formData, affectedTrails: value as string[] })}
            multiple
            searchable
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Alert Duration"
              description="Alert will auto-expire after this period"
              options={[
                { value: '6', label: '6 hours' },
                { value: '12', label: '12 hours' },
                { value: '24', label: '24 hours' },
                { value: '48', label: '48 hours' },
                { value: '72', label: '3 days' },
                { value: '168', label: '1 week' },
              ]}
              value={formData.expiresIn}
              onChange={(value) => setFormData({ ...formData, expiresIn: value as string })}
            />

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.sendNotifications}
                  onChange={(e) => setFormData({ ...formData, sendNotifications: e.target.checked })}
                  className="w-4 h-4 rounded border-border text-primary focus-ring"
                />
                <span className="text-sm text-foreground">Send push notifications to affected users</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              fullWidth
              className="sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              iconName="Send"
              iconPosition="left"
              fullWidth
              className="sm:w-auto"
            >
              Create & Broadcast Alert
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAlertModal;