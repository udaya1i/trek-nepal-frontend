import { useState } from 'react';
import { TrekItinerary } from '../types';
import Button from 'components/ui/Button';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/Card';
import Input from 'components/ui/Input';
import Textarea from 'components/ui/Textarea';
interface ItinerarySectionProps {
  trekId: number;
  itineraries: TrekItinerary[];
  onChange: (itineraries: TrekItinerary[]) => void;
}

export const ItinerarySection = ({ trekId, itineraries, onChange }: ItinerarySectionProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<TrekItinerary>>({
    dayNumber: itineraries.length + 1,
    startLocation: '',
    endLocation: '',
    durationHours: 0,
    altitudeGain: 0,
    altitudeLoss: 0,
    trekShortDescription: '',
    trekFullDescription: '',
    temperature: '',
  });

  const handleAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      dayNumber: itineraries.length + 1,
      startLocation: '',
      endLocation: '',
      durationHours: 0,
      altitudeGain: 0,
      altitudeLoss: 0,
      trekShortDescription: '',
      trekFullDescription: '',
      temperature: '',
    });
  };

  const handleEdit = (itinerary: TrekItinerary) => {
    setIsAdding(true);
    setEditingId(itinerary.id);
    setFormData(itinerary);
  };

  const handleSave = () => {
    if (!formData.startLocation || !formData.endLocation || !formData.trekShortDescription || !formData.trekFullDescription) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingId) {
      onChange(itineraries.map(i => i.id === editingId ? { ...formData, id: editingId, trek: trekId } as TrekItinerary : i));
    } else {
      const newItinerary: TrekItinerary = {
        id: Date.now(),
        trek: trekId,
        dayNumber: formData.dayNumber || itineraries.length + 1,
        startLocation: formData.startLocation || '',
        endLocation: formData.endLocation || '',
        durationHours: formData.durationHours || 0,
        altitudeGain: formData.altitudeGain,
        altitudeLoss: formData.altitudeLoss,
        trekShortDescription: formData.trekShortDescription || '',
        trekFullDescription: formData.trekFullDescription || '',
        temperature: formData.temperature,
      };
      onChange([...itineraries, newItinerary]);
    }
    setIsAdding(false);
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this itinerary day?')) {
      onChange(itineraries.filter(i => i.id !== id));
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
          <h2 className="text-xl font-semibold text-gray-900">Trek Itinerary</h2>
          <p className="text-sm text-gray-500 mt-1">Add daily trekking schedule and details</p>
        </div>
        {!isAdding && (
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add Day
          </Button>
        )}
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Itinerary Day' : 'Add Itinerary Day'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Day Number"
                  type="number"
                  value={formData.dayNumber}
                  onChange={(e) => setFormData({ ...formData, dayNumber: parseInt(e.target.value) })}
                  required
                />
                <Input
                  label="Duration (Hours)"
                  type="number"
                  step="0.1"
                  value={formData.durationHours}
                  onChange={(e) => setFormData({ ...formData, durationHours: parseFloat(e.target.value) })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Starting Point"
                  value={formData.startLocation}
                  onChange={(e) => setFormData({ ...formData, startLocation: e.target.value })}
                  required
                />
                <Input
                  label="End Point"
                  value={formData.endLocation}
                  onChange={(e) => setFormData({ ...formData, endLocation: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Altitude Gain (m)"
                  type="number"
                  value={formData.altitudeGain || ''}
                  onChange={(e) => setFormData({ ...formData, altitudeGain: parseInt(e.target.value) || undefined })}
                />
                <Input
                  label="Altitude Loss (m)"
                  type="number"
                  value={formData.altitudeLoss || ''}
                  onChange={(e) => setFormData({ ...formData, altitudeLoss: parseInt(e.target.value) || undefined })}
                />
              </div>

              <Input
                label="Temperature"
                value={formData.temperature || ''}
                onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                placeholder="e.g., 10-15°C"
              />

              <Textarea
                label="Short Description"
                value={formData.trekShortDescription}
                onChange={(e) => setFormData({ ...formData, trekShortDescription: e.target.value })}
                rows={2}
                required
              />

              <Textarea
                label="Full Description"
                value={formData.trekFullDescription}
                onChange={(e) => setFormData({ ...formData, trekFullDescription: e.target.value })}
                rows={4}
                required
              />

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {editingId ? 'Update' : 'Add Day'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {itineraries.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No itinerary days added yet. Click "Add Day" to start.</p>
            </CardContent>
          </Card>
        ) : (
          itineraries.map((itinerary) => (
            <Card key={itinerary.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    Day {itinerary.dayNumber}: {itinerary.startLocation} → {itinerary.endLocation}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(itinerary)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(itinerary.id)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="font-medium">{itinerary.durationHours} hours</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Altitude Gain</p>
                    <p className="font-medium">{itinerary.altitudeGain || '-'} m</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Altitude Loss</p>
                    <p className="font-medium">{itinerary.altitudeLoss || '-'} m</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Temperature</p>
                    <p className="font-medium">{itinerary.temperature || '-'}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{itinerary.trekShortDescription}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
