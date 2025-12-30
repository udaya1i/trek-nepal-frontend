import { useState } from 'react';
import { Plus, Edit, Trash2, MapPin } from 'lucide-react';
import { TrekWaypoint, WaypointType } from '../types';
import Button from 'components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/Card';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';
import Textarea from 'components/ui/Textarea';

interface WaypointSectionProps {
  trekId: number;
  waypoints: TrekWaypoint[];
  onChange: (waypoints: TrekWaypoint[]) => void;
}

export const WaypointSection = ({ trekId, waypoints, onChange }: WaypointSectionProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<TrekWaypoint>>({
    name: '',
    latitude: 0,
    longitude: 0,
    altitude: 0,
    waypointType: WaypointType.VILLAGE,
    shorDescription: '',
    fullDescription: '',
  });

  const waypointTypeOptions = [
    { value: WaypointType.VILLAGE, label: 'Village' },
    { value: WaypointType.VIEWPOINT, label: 'Viewpoint' },
    { value: WaypointType.CAMP, label: 'Camp' },
    { value: WaypointType.PASS, label: 'Pass' },
    { value: WaypointType.MONASTERY, label: 'Monastery' },
    { value: WaypointType.LAKE, label: 'Lake' },
    { value: WaypointType.WATERFALL, label: 'Waterfall' },
    { value: WaypointType.SUMMIT, label: 'Summit' },
  ];

  const handleAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      name: '',
      latitude: 0,
      longitude: 0,
      altitude: 0,
      waypointType: WaypointType.VILLAGE,
      shorDescription: '',
      fullDescription: '',
    });
  };

  const handleEdit = (waypoint: TrekWaypoint) => {
    setIsAdding(true);
    setEditingId(waypoint.id);
    setFormData(waypoint);
  };

  const handleSave = () => {
    if (!formData.name || !formData.shorDescription || !formData.fullDescription) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingId) {
      onChange(waypoints.map(w => w.id === editingId ? { ...formData, id: editingId, trekId, images: [] } as TrekWaypoint : w));
    } else {
      const newWaypoint: TrekWaypoint = {
        id: Date.now(),
        trekId,
        name: formData.name || '',
        latitude: formData.latitude || 0,
        longitude: formData.longitude || 0,
        altitude: formData.altitude || 0,
        waypointType: formData.waypointType || WaypointType.VILLAGE,
        shorDescription: formData.shorDescription || '',
        fullDescription: formData.fullDescription || '',
        images: [],
      };
      onChange([...waypoints, newWaypoint]);
    }
    setIsAdding(false);
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this waypoint?')) {
      onChange(waypoints.filter(w => w.id !== id));
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Trek Waypoints</h2>
          <p className="text-sm text-gray-500 mt-1">Add important locations and landmarks along the trek</p>
        </div>
        {!isAdding && (
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add Waypoint
          </Button>
        )}
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Waypoint' : 'Add Waypoint'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                label="Waypoint Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <div className="grid grid-cols-3 gap-4">
                <Input
                  label="Latitude"
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
                  placeholder="e.g., 27.8047"
                  required
                />
                <Input
                  label="Longitude"
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
                  placeholder="e.g., 86.7132"
                  required
                />
                <Input
                  label="Altitude (m)"
                  type="number"
                  value={formData.altitude}
                  onChange={(e) => setFormData({ ...formData, altitude: parseInt(e.target.value) })}
                  required
                />
              </div>

              <Select
                label="Waypoint Type"
                value={formData.waypointType}
                onChange={(e) => setFormData({ ...formData, waypointType: e.target.value as WaypointType })}
                options={waypointTypeOptions}
                required
              />

              <Textarea
                label="Short Description"
                value={formData.shorDescription}
                onChange={(e) => setFormData({ ...formData, shorDescription: e.target.value })}
                rows={2}
                required
              />

              <Textarea
                label="Full Description"
                value={formData.fullDescription}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                rows={4}
                required
              />

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {editingId ? 'Update' : 'Add Waypoint'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4">
        {waypoints.length === 0 ? (
          <Card className="col-span-2">
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No waypoints added yet. Click "Add Waypoint" to start.</p>
            </CardContent>
          </Card>
        ) : (
          waypoints.map((waypoint) => (
            <Card key={waypoint.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-base">{waypoint.name}</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(waypoint)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(waypoint.id)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Altitude:</span>
                    <span className="font-medium">{waypoint.altitude} m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Coordinates:</span>
                    <span className="font-medium">{waypoint.latitude.toFixed(4)}, {waypoint.longitude.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type:</span>
                    <span className="font-medium capitalize">{waypoint.waypointType.toLowerCase()}</span>
                  </div>
                  <p className="text-gray-600 mt-3">{waypoint.shorDescription}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
