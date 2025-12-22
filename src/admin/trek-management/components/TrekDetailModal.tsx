import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import { Trek } from '../types';
import Icon from 'components/ui/AppIcon';
import AppImage from 'components/ui/AppImage';

interface TrekDetailModalProps {
  trek: Trek | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (trek: Trek) => void;
}

const TrekDetailModal = ({ trek, isOpen, onClose, onSave }: TrekDetailModalProps) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTrek, setEditedTrek] = useState<Trek | null>(trek);
  const [activeTab, setActiveTab] = useState<'details' | 'route' | 'safety' | 'pricing'>(
    'details'
  );

  React.useEffect(() => {
    setEditedTrek(trek);
    setEditMode(false);
    setActiveTab('details');
  }, [trek]);

  if (!isOpen || !trek) return null;

  const handleSave = () => {
    if (editedTrek) {
      onSave(editedTrek);
      setEditMode(false);
    }
  };

  const difficultyOptions = [
    { value: 'Easy', label: 'Easy' },
    { value: 'Moderate', label: 'Moderate' },
    { value: 'Challenging', label: 'Challenging' },
    { value: 'Strenuous', label: 'Strenuous' },
    { value: 'Extreme', label: 'Extreme' },
  ];

  const statusOptions = [
    { value: 'Published', label: 'Published' },
    { value: 'Draft', label: 'Draft' },
    { value: 'Under Review', label: 'Under Review' },
    { value: 'Archived', label: 'Archived' },
  ];

  const tabs = [
    { id: 'details', label: 'Details', icon: 'Info' },
    { id: 'route', label: 'Route', icon: 'Map' },
    { id: 'safety', label: 'Safety', icon: 'Shield' },
    { id: 'pricing', label: 'Pricing', icon: 'DollarSign' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] bg-card border border-border rounded-lg shadow-elevation-5 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <Icon name="Mountain" size={24} className="text-primary" />
            <div>
              <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                {editMode ? 'Edit Trek' : 'Trek Details'}
              </h2>
              <p className="text-sm text-muted-foreground caption mt-1">
                {trek.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!editMode ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditMode(true)}
                iconName="Edit"
                iconSize={16}
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditedTrek(trek);
                    setEditMode(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSave}
                  iconName="Save"
                  iconSize={16}
                >
                  Save
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
              iconSize={20}
            />
          </div>
        </div>

        <div className="border-b border-border overflow-x-auto">
          <div className="flex gap-1 p-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Trek Name"
                  value={editedTrek?.name || ''}
                  onChange={(e) =>
                    editedTrek &&
                    setEditedTrek({ ...editedTrek, name: e.target.value })
                  }
                  disabled={!editMode}
                  required
                />
                <Input
                  label="Region"
                  value={editedTrek?.region || ''}
                  onChange={(e) =>
                    editedTrek &&
                    setEditedTrek({ ...editedTrek, region: e.target.value })
                  }
                  disabled={!editMode}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  label="Difficulty"
                  options={difficultyOptions}
                  value={editedTrek?.difficulty || ''}
                  onChange={(value) =>
                    editedTrek &&
                    setEditedTrek({
                      ...editedTrek,
                      difficulty: value as Trek['difficulty'],
                    })
                  }
                  disabled={!editMode}
                  required
                />
                <Input
                  label="Duration (days)"
                  type="number"
                  value={editedTrek?.duration || ''}
                  onChange={(e) =>
                    editedTrek &&
                    setEditedTrek({
                      ...editedTrek,
                      duration: parseInt(e.target.value),
                    })
                  }
                  disabled={!editMode}
                  required
                />
                <Input
                  label="Max Altitude (m)"
                  type="number"
                  value={editedTrek?.maxAltitude || ''}
                  onChange={(e) =>
                    editedTrek &&
                    setEditedTrek({
                      ...editedTrek,
                      maxAltitude: parseInt(e.target.value),
                    })
                  }
                  disabled={!editMode}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Best Season"
                  value={editedTrek?.bestSeason || ''}
                  onChange={(e) =>
                    editedTrek &&
                    setEditedTrek({ ...editedTrek, bestSeason: e.target.value })
                  }
                  disabled={!editMode}
                />
                <Select
                  label="Status"
                  options={statusOptions}
                  value={editedTrek?.status || ''}
                  onChange={(value) =>
                    editedTrek &&
                    setEditedTrek({ ...editedTrek, status: value as Trek['status'] })
                  }
                  disabled={!editMode}
                  required
                />
              </div>

              <div className="flex gap-4">
                <Checkbox
                  label="Permit Required"
                  checked={editedTrek?.permitRequired || false}
                  onChange={(e) =>
                    editedTrek &&
                    setEditedTrek({
                      ...editedTrek,
                      permitRequired: e.target.checked,
                    })
                  }
                  disabled={!editMode}
                />
                <Checkbox
                  label="Featured Trek"
                  checked={editedTrek?.featured || false}
                  onChange={(e) =>
                    editedTrek &&
                    setEditedTrek({ ...editedTrek, featured: e.target.checked })
                  }
                  disabled={!editMode}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  value={editedTrek?.description || ''}
                  onChange={(e) =>
                    editedTrek &&
                    setEditedTrek({ ...editedTrek, description: e.target.value })
                  }
                  disabled={!editMode}
                  rows={4}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {trek.images.map((img, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden border border-border"
                  >
                    <AppImage
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'route' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Start Point"
                  value={editedTrek?.route.startPoint || ''}
                  onChange={(e) =>
                    editedTrek &&
                    setEditedTrek({
                      ...editedTrek,
                      route: { ...editedTrek.route, startPoint: e.target.value },
                    })
                  }
                  disabled={!editMode}
                  required
                />
                <Input
                  label="End Point"
                  value={editedTrek?.route.endPoint || ''}
                  onChange={(e) =>
                    editedTrek &&
                    setEditedTrek({
                      ...editedTrek,
                      route: { ...editedTrek.route, endPoint: e.target.value },
                    })
                  }
                  disabled={!editMode}
                  required
                />
              </div>

              <Input
                label="Total Distance (km)"
                type="number"
                value={editedTrek?.route.totalDistance || ''}
                onChange={(e) =>
                  editedTrek &&
                  setEditedTrek({
                    ...editedTrek,
                    route: {
                      ...editedTrek.route,
                      totalDistance: parseInt(e.target.value),
                    },
                  })
                }
                disabled={!editMode}
                required
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Highlights
                </label>
                <div className="space-y-2">
                  {trek.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-muted/50 rounded-md"
                    >
                      <Icon name="CheckCircle" size={16} className="text-success" />
                      <span className="text-sm text-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Requirements
                </label>
                <div className="space-y-2">
                  {trek.requirements.map((requirement, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-muted/50 rounded-md"
                    >
                      <Icon name="AlertCircle" size={16} className="text-warning" />
                      <span className="text-sm text-foreground">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="space-y-6">
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Risk Level: {trek.safety.riskLevel}
                    </p>
                    <p className="text-xs text-muted-foreground caption mt-1">
                      This trek requires proper preparation and safety measures
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Emergency Contacts
                </label>
                <div className="space-y-2">
                  {trek.safety.emergencyContacts.map((contact, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-card border border-border rounded-md"
                    >
                      <Icon name="Phone" size={16} className="text-primary" />
                      <span className="text-sm text-foreground font-medium data-text">
                        {contact}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                    trek.safety.medicalFacilities
                      ? 'bg-success/10' :'bg-error/10'
                  }`}
                >
                  <Icon
                    name={trek.safety.medicalFacilities ? 'CheckCircle' : 'XCircle'}
                    size={24}
                    className={
                      trek.safety.medicalFacilities ? 'text-success' : 'text-error'
                    }
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Medical Facilities
                  </p>
                  <p className="text-xs text-muted-foreground caption mt-1">
                    {trek.safety.medicalFacilities
                      ? 'Available along the route' :'Limited or not available'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Minimum Price"
                  type="number"
                  value={editedTrek?.price.min || ''}
                  onChange={(e) =>
                    editedTrek &&
                    setEditedTrek({
                      ...editedTrek,
                      price: { ...editedTrek.price, min: parseInt(e.target.value) },
                    })
                  }
                  disabled={!editMode}
                  required
                />
                <Input
                  label="Maximum Price"
                  type="number"
                  value={editedTrek?.price.max || ''}
                  onChange={(e) =>
                    editedTrek &&
                    setEditedTrek({
                      ...editedTrek,
                      price: { ...editedTrek.price, max: parseInt(e.target.value) },
                    })
                  }
                  disabled={!editMode}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Users" size={16} className="text-primary" />
                    <p className="text-xs text-muted-foreground caption">Total Bookings</p>
                  </div>
                  <p className="text-2xl font-heading font-bold text-foreground whitespace-nowrap">
                    {trek.bookingCount}
                  </p>
                </div>

                <div className="p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Star" size={16} className="text-accent" />
                    <p className="text-xs text-muted-foreground caption">Rating</p>
                  </div>
                  <p className="text-2xl font-heading font-bold text-foreground whitespace-nowrap">
                    {trek.rating.toFixed(1)}
                  </p>
                </div>

                <div className="p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="MessageSquare" size={16} className="text-secondary" />
                    <p className="text-xs text-muted-foreground caption">Reviews</p>
                  </div>
                  <p className="text-2xl font-heading font-bold text-foreground whitespace-nowrap">
                    {trek.reviewCount}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Price Range: NPR {trek.price.min.toLocaleString()} - NPR{' '}
                      {trek.price.max.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground caption mt-1">
                      Prices may vary based on group size, season, and additional services
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrekDetailModal;