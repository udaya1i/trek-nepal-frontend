import { useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { TrekPacking } from '../types';
import Button from 'components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/Card';
import Input from 'components/ui/Input';
interface PackingSectionProps {
  trekId: number;
  packingLists: TrekPacking[];
  onChange: (packingLists: TrekPacking[]) => void;
}

export const PackingSection = ({ trekId, packingLists, onChange }: PackingSectionProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<TrekPacking>>({
    name: '',
    items: [],
  });
  const [currentItem, setCurrentItem] = useState('');

  const handleAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      name: '',
      items: [],
    });
    setCurrentItem('');
  };

  const handleEdit = (packing: TrekPacking) => {
    setIsAdding(true);
    setEditingId(packing.id);
    setFormData(packing);
  };

  const handleAddItem = () => {
    if (currentItem.trim()) {
      setFormData({ ...formData, items: [...(formData.items || []), currentItem.trim()] });
      setCurrentItem('');
    }
  };

  const handleRemoveItem = (index: number) => {
    setFormData({ ...formData, items: (formData.items || []).filter((_, i) => i !== index) });
  };

  const handleSave = () => {
    if (!formData.name || !formData.items || formData.items.length === 0) {
      alert('Please add a category name and at least one item');
      return;
    }

    if (editingId) {
      onChange(packingLists.map(p => p.id === editingId ? { ...formData, id: editingId, trek: trekId } as TrekPacking : p));
    } else {
      const newPacking: TrekPacking = {
        id: Date.now(),
        trek: trekId,
        name: formData.name || '',
        items: formData.items || [],
      };
      onChange([...packingLists, newPacking]);
    }
    setIsAdding(false);
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this packing list?')) {
      onChange(packingLists.filter(p => p.id !== id));
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
          <h2 className="text-xl font-semibold text-gray-900">Packing Lists</h2>
          <p className="text-sm text-gray-500 mt-1">Organize essential items by category for trekkers</p>
        </div>
        {!isAdding && (
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add Packing List
          </Button>
        )}
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Packing List' : 'Add Packing List'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                label="Category Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Essential Gear, Clothing"
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Items <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <Input
                    value={currentItem}
                    onChange={(e) => setCurrentItem(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem())}
                    placeholder="Enter an item and click Add"
                  />
                  <Button type="button" onClick={handleAddItem}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {(formData.items || []).length > 0 && (
                  <div className="mt-4 space-y-2">
                    {(formData.items || []).map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{item}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(index)}
                        >
                          <X className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {editingId ? 'Update' : 'Add List'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4">
        {packingLists.length === 0 ? (
          <Card className="col-span-2">
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No packing lists added yet. Click "Add Packing List" to start.</p>
            </CardContent>
          </Card>
        ) : (
          packingLists.map((packing) => (
            <Card key={packing.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{packing.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(packing)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(packing.id)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {packing.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
