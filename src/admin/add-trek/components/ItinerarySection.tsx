import React, { useState } from 'react';
import Input from 'components/ui/Input';
import { Button } from 'components/ui/Button';
import { Checkbox } from 'components/ui/Checkbox';
import { TrekFormData, ItineraryDay } from '../types';
import { Calendar, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface ItinerarySectionProps {
  formData: TrekFormData;
  onChange: (field: keyof TrekFormData, value: any) => void;
  errors: Record<string, string>;
}

const ItinerarySection: React.FC<ItinerarySectionProps> = ({ formData, onChange, errors }) => {
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([0]));
  const [newDay, setNewDay] = useState<Partial<ItineraryDay>>({
    title: '',
    description: '',
    distance: 0,
    altitude: 0,
    accommodationType: '',
    meals: [],
  });

  const mealOptions = ['Breakfast', 'Lunch', 'Dinner'];

  const toggleDay = (day: number) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded.has(day)) {
      newExpanded.delete(day);
    } else {
      newExpanded.add(day);
    }
    setExpandedDays(newExpanded);
  };

  const handleAddDay = () => {
    if (!newDay.title || !newDay.description) return;

    const day: ItineraryDay = {
      day: (formData.itinerary?.length || 0) + 1,
      title: newDay.title || '',
      description: newDay.description || '',
      distance: newDay.distance || 0,
      altitude: newDay.altitude || 0,
      accommodationType: newDay.accommodationType || '',
      meals: newDay.meals || [],
    };

    onChange('itinerary', [...(formData.itinerary || []), day]);
    setNewDay({
      title: '',
      description: '',
      distance: 0,
      altitude: 0,
      accommodationType: '',
      meals: [],
    });
  };

  const handleRemoveDay = (dayNumber: number) => {
    const updatedItinerary = (formData.itinerary || [])
      .filter(d => d.day !== dayNumber)
      .map((d, index) => ({ ...d, day: index + 1 }));
    onChange('itinerary', updatedItinerary);
  };

  const handleMealToggle = (meal: string) => {
    const currentMeals = newDay.meals || [];
    const updatedMeals = currentMeals.includes(meal)
      ? currentMeals.filter(m => m !== meal)
      : [...currentMeals, meal];
    setNewDay({ ...newDay, meals: updatedMeals });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Trek Itinerary
        </h3>

        {(formData.itinerary || []).length > 0 && (
          <div className="mb-6 space-y-3">
            {(formData.itinerary || []).map((day) => (
              <div key={day.day} className="border border-gray-200 rounded-lg overflow-hidden">
                <div
                  className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleDay(day.day)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-blue-600">Day {day.day}</span>
                    <span className="text-sm font-medium">{day.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveDay(day.day);
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                    {expandedDays.has(day.day) ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </div>

                {expandedDays.has(day.day) && (
                  <div className="p-4 space-y-3">
                    <p className="text-sm text-gray-700">{day.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Distance:</span>
                        <span className="ml-1 font-medium">{day.distance} km</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Altitude:</span>
                        <span className="ml-1 font-medium">{day.altitude} m</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Accommodation:</span>
                        <span className="ml-1 font-medium">{day.accommodationType}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Meals:</span>
                        <span className="ml-1 font-medium">{day.meals.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="border-t pt-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Add New Day</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Day Title"
                value={newDay.title || ''}
                onChange={(e) => setNewDay({ ...newDay, title: e.target.value })}
                placeholder="e.g., Lukla to Phakding"
              />
              <Input
                label="Accommodation Type"
                value={newDay.accommodationType || ''}
                onChange={(e) => setNewDay({ ...newDay, accommodationType: e.target.value })}
                placeholder="e.g., Tea House, Lodge"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Day Description</label>
              <textarea
                value={newDay.description || ''}
                onChange={(e) => setNewDay({ ...newDay, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Describe the day's journey, what to expect, sights, etc..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Distance (km)"
                type="number"
                value={newDay.distance?.toString() || ''}
                onChange={(e) => setNewDay({ ...newDay, distance: parseFloat(e.target.value) || 0 })}
                placeholder="e.g., 8.5"
                step="0.1"
              />
              <Input
                label="Altitude (m)"
                type="number"
                value={newDay.altitude?.toString() || ''}
                onChange={(e) => setNewDay({ ...newDay, altitude: parseInt(e.target.value) || 0 })}
                placeholder="e.g., 2610"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meals Included</label>
              <div className="flex gap-4">
                {mealOptions.map((meal) => (
                  <Checkbox
                    key={meal}
                    label={meal}
                    checked={(newDay.meals || []).includes(meal)}
                    onChange={() => handleMealToggle(meal)}
                  />
                ))}
              </div>
            </div>

            <Button variant="secondary" onClick={handleAddDay}>
              <Plus className="w-4 h-4 mr-2" />
              Add Day to Itinerary
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItinerarySection;