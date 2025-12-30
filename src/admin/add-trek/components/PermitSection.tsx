import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Permit } from '../types';
import Button from 'components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/Card';
import Input from 'components/ui/Input';
import Textarea from 'components/ui/Textarea';

interface PermitSectionProps {
  trekId: number;
  permits: Permit[];
  onChange: (permits: Permit[]) => void;
}

export const PermitSection = ({ trekId, permits, onChange }: PermitSectionProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Permit>>({
    name: '',
    description: '',
    issuingAuthority: '',
    cost: 0,
    validityDays: 0,
  });

  const handleAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      issuingAuthority: '',
      cost: 0,
      validityDays: 0,
    });
  };

  const handleEdit = (permit: Permit) => {
    setIsAdding(true);
    setEditingId(permit.id);
    setFormData(permit);
  };

  const handleSave = () => {
    if (!formData.name) {
      alert('Please fill in the permit name');
      return;
    }

    if (editingId) {
      onChange(permits.map(p => p.id === editingId ? { ...formData, id: editingId, trek: trekId } as Permit : p));
    } else {
      const newPermit: Permit = {
        id: Date.now(),
        trek: trekId,
        name: formData.name || '',
        description: formData.description,
        issuingAuthority: formData.issuingAuthority,
        cost: formData.cost,
        validityDays: formData.validityDays,
      };
      onChange([...permits, newPermit]);
    }
    setIsAdding(false);
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this permit?')) {
      onChange(permits.filter(p => p.id !== id));
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
          <h2 className="text-xl font-semibold text-gray-900">Required Permits</h2>
          <p className="text-sm text-gray-500 mt-1">Add permits and entry fees required for this trek</p>
        </div>
        {!isAdding && (
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add Permit
          </Button>
        )}
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Permit' : 'Add Permit'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                label="Permit Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., TIMS Card"
                required
              />

              <Textarea
                label="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Brief description of the permit"
              />

              <Input
                label="Issuing Authority"
                value={formData.issuingAuthority || ''}
                onChange={(e) => setFormData({ ...formData, issuingAuthority: e.target.value })}
                placeholder="e.g., Nepal Tourism Board"
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Cost (NPR)"
                  type="number"
                  step="0.01"
                  value={formData.cost || ''}
                  onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) || undefined })}
                  placeholder="e.g., 2000"
                />
                <Input
                  label="Validity (Days)"
                  type="number"
                  value={formData.validityDays || ''}
                  onChange={(e) => setFormData({ ...formData, validityDays: parseInt(e.target.value) || undefined })}
                  placeholder="e.g., 90"
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {editingId ? 'Update' : 'Add Permit'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {permits.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No permits added yet. Click "Add Permit" to start.</p>
            </CardContent>
          </Card>
        ) : (
          permits.map((permit) => (
            <Card key={permit.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{permit.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(permit)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(permit.id)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {permit.description && (
                  <p className="text-sm text-gray-600 mb-4">{permit.description}</p>
                )}
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Issuing Authority</p>
                    <p className="font-medium">{permit.issuingAuthority || '-'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Cost</p>
                    <p className="font-medium">NPR {permit.cost || 0}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Validity</p>
                    <p className="font-medium">{permit.validityDays || 0} days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
