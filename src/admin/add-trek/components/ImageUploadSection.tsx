import React, { useState } from 'react';
import Input from 'components/ui/Input';
import { Button } from 'components/ui/Button';
import { Checkbox } from 'components/ui/Checkbox';
import { TrekFormData, TrekImage } from '../types';
import { Image as ImageIcon, Plus, Trash2, Star } from 'lucide-react';

interface ImageUploadSectionProps {
  formData: TrekFormData;
  onChange: (field: keyof TrekFormData, value: any) => void;
  errors: Record<string, string>;
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({ formData, onChange, errors }) => {
  const [newImage, setNewImage] = useState<Partial<TrekImage>>({
    url: '',
    alt: '',
    caption: '',
    isPrimary: false,
  });

  const handleAddImage = () => {
    if (!newImage.url || !newImage.alt) return;

    const image: TrekImage = {
      id: Date.now().toString(),
      url: newImage.url || '',
      alt: newImage.alt || '',
      caption: newImage.caption || '',
      isPrimary: newImage.isPrimary || false,
    };

    // If this is marked as primary, unmark all others
    let updatedImages = [...(formData.images || []), image];
    if (image.isPrimary) {
      updatedImages = updatedImages.map(img => ({
        ...img,
        isPrimary: img.id === image.id,
      }));
    }

    onChange('images', updatedImages);
    setNewImage({ url: '', alt: '', caption: '', isPrimary: false });
  };

  const handleRemoveImage = (id: string) => {
    let updatedImages = (formData.images || []).filter(img => img.id !== id);
    onChange('images', updatedImages);
  };

  const handleSetPrimary = (id: string) => {
    let updatedImages = (formData.images || []).map(img => ({
      ...img,
      isPrimary: img.id === id,
    }));
    onChange('images', updatedImages);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-blue-600" />
          Trek Images
        </h3>

        {(formData.images || []).length > 0 && (
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(formData.images || []).map((image) => (
              <div key={image.id} className="relative group border border-gray-200 rounded-lg overflow-hidden">
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  {image.url ? (
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                
                {image.isPrimary && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Primary
                  </div>
                )}

                <div className="p-3 space-y-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{image.alt}</p>
                  {image.caption && (
                    <p className="text-xs text-gray-600 truncate">{image.caption}</p>
                  )}
                </div>

                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  {!image.isPrimary && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleSetPrimary(image.id)}
                      className="bg-white"
                    >
                      <Star className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleRemoveImage(image.id)}
                    className="bg-white"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="border-t pt-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Add New Image</h4>
          <div className="space-y-4">
            <Input
              label="Image URL"
              value={newImage.url || ''}
              onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
              placeholder="https://example.com/trek-image.jpg"
            />

            <Input
              label="Alt Text (Image Description)"
              value={newImage.alt || ''}
              onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })}
              placeholder="e.g., Trekkers crossing suspension bridge over Dudh Koshi river"
            />

            <Input
              label="Caption (Optional)"
              value={newImage.caption || ''}
              onChange={(e) => setNewImage({ ...newImage, caption: e.target.value })}
              placeholder="e.g., Day 3 - Crossing to Namche Bazaar"
            />

            <Checkbox
              label="Set as Primary Image"
              checked={newImage.isPrimary || false}
              onChange={(e) => setNewImage({ ...newImage, isPrimary: e.target.checked })}
            />

            <Button variant="secondary" onClick={handleAddImage}>
              <Plus className="w-4 h-4 mr-2" />
              Add Image
            </Button>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Image Guidelines:</strong> Use high-quality images that showcase the trek. 
              The primary image will be used as the main thumbnail. Include descriptive alt text 
              for accessibility and SEO.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadSection;