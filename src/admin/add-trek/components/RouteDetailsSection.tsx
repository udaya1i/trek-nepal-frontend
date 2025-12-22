import React, { useState } from 'react';
import Input from 'components/ui/Input';
import { Button } from 'components/ui/Button';
import { TrekFormData, Waypoint } from '../types';
import { MapPin, Plus, Trash2, Navigation } from 'lucide-react';

interface RouteDetailsSectionProps {
  formData: TrekFormData;
  onChange: (field: keyof TrekFormData, value: any) => void;
  errors: Record<string, string>;
}

const RouteDetailsSection: React.FC<RouteDetailsSectionProps> = ({ formData, onChange, errors }) => {
  const [newWaypoint, setNewWaypoint] = useState<Partial<Waypoint>>({
    name: '',
    latitude: 0,
    longitude: 0,
    altitude: 0,
  });

  const handleRouteChange = (field: string, value: any) => {
    onChange('route', {
      ...formData.route,
      [field]: value,
    });
  };

  const handleAddWaypoint = () => {
    if (!newWaypoint.name || !newWaypoint.latitude || !newWaypoint.longitude) {
      return;
    }

    const waypoint: Waypoint = {
      id: Date.now().toString(),
      name: newWaypoint.name || '',
      latitude: newWaypoint.latitude || 0,
      longitude: newWaypoint.longitude || 0,
      altitude: newWaypoint.altitude || 0,
      order: (formData.route?.waypoints?.length || 0) + 1,
    };

    handleRouteChange('waypoints', [...(formData.route?.waypoints || []), waypoint]);
    setNewWaypoint({ name: '', latitude: 0, longitude: 0, altitude: 0 });
  };

  const handleRemoveWaypoint = (id: string) => {
    const updatedWaypoints = (formData.route?.waypoints || []).filter(wp => wp.id !== id);
    handleRouteChange('waypoints', updatedWaypoints);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Navigation className="w-5 h-5 text-blue-600" />
          Route Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Input
            label="Start Point"
            value={formData.route?.startPoint || ''}
            onChange={(e) => handleRouteChange('startPoint', e.target.value)}
            error={errors['route.startPoint']}
            placeholder="e.g., Lukla"
            required
          />

          <Input
            label="End Point"
            value={formData.route?.endPoint || ''}
            onChange={(e) => handleRouteChange('endPoint', e.target.value)}
            error={errors['route.endPoint']}
            placeholder="e.g., Lukla"
            required
          />

          <Input
            label="Total Distance (km)"
            type="number"
            value={formData.route?.totalDistance?.toString() || ''}
            onChange={(e) => handleRouteChange('totalDistance', parseFloat(e.target.value) || 0)}
            error={errors['route.totalDistance']}
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="border-t pt-6">
          <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            Waypoints & Checkpoints
          </h4>

          {(formData.route?.waypoints || []).length > 0 && (
            <div className="mb-4 space-y-2">
              {(formData.route?.waypoints || []).map((waypoint, index) => (
                <div key={waypoint.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600 w-8">{index + 1}.</span>
                  <div className="flex-1 grid grid-cols-4 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">Name:</span>
                      <span className="ml-1 font-medium">{waypoint.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Lat:</span>
                      <span className="ml-1 font-medium">{waypoint.latitude.toFixed(4)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Long:</span>
                      <span className="ml-1 font-medium">{waypoint.longitude.toFixed(4)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Alt:</span>
                      <span className="ml-1 font-medium">{waypoint.altitude}m</span>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleRemoveWaypoint(waypoint.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="md:col-span-2">
              <Input
                label="Waypoint Name"
                value={newWaypoint.name || ''}
                onChange={(e) => setNewWaypoint({ ...newWaypoint, name: e.target.value })}
                placeholder="e.g., Namche Bazaar"
              />
            </div>
            <Input
              label="Latitude"
              type="number"
              value={newWaypoint.latitude?.toString() || ''}
              onChange={(e) => setNewWaypoint({ ...newWaypoint, latitude: parseFloat(e.target.value) || 0 })}
              placeholder="27.8060"
              step="0.0001"
            />
            <Input
              label="Longitude"
              type="number"
              value={newWaypoint.longitude?.toString() || ''}
              onChange={(e) => setNewWaypoint({ ...newWaypoint, longitude: parseFloat(e.target.value) || 0 })}
              placeholder="86.7104"
              step="0.0001"
            />
            <Input
              label="Altitude (m)"
              type="number"
              value={newWaypoint.altitude?.toString() || ''}
              onChange={(e) => setNewWaypoint({ ...newWaypoint, altitude: parseInt(e.target.value) || 0 })}
              placeholder="3440"
            />
          </div>
          <Button
            variant="secondary"
            className="mt-2"
            onClick={handleAddWaypoint}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Waypoint
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RouteDetailsSection;