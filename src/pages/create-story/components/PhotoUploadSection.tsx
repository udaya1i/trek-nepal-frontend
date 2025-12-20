'use client';

import React, { useState, useEffect } from 'react';
import Icon from 'components/ui/AppIcon';
import AppImage from 'components/ui/AppImage';

interface Photo {
  id: string;
  url: string;
  alt: string;
  caption: string;
  isFeatured: boolean;
}

interface PhotoUploadSectionProps {
  photos: Photo[];
  onPhotosChange: (photos: Photo[]) => void;
  error?: string;
}

const PhotoUploadSection = ({ photos, onPhotosChange, error }: PhotoUploadSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [editingCaption, setEditingCaption] = useState<string | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));

    const newPhotos: Photo[] = imageFiles.map((file, index) => ({
      id: `photo-${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      alt: `Uploaded trekking photo showing ${file.name.replace(/\.[^/.]+$/, '')}`,
      caption: '',
      isFeatured: photos.length === 0 && index === 0,
    }));

    onPhotosChange([...photos, ...newPhotos]);
  };

  const handleRemovePhoto = (photoId: string) => {
    const updatedPhotos = photos.filter((photo) => photo.id !== photoId);
    onPhotosChange(updatedPhotos);
  };

  const handleSetFeatured = (photoId: string) => {
    const updatedPhotos = photos.map((photo) => ({
      ...photo,
      isFeatured: photo.id === photoId,
    }));
    onPhotosChange(updatedPhotos);
  };

  const handleCaptionChange = (photoId: string, caption: string) => {
    const updatedPhotos = photos.map((photo) =>
      photo.id === photoId ? { ...photo, caption } : photo
    );
    onPhotosChange(updatedPhotos);
  };

  const handleMovePhoto = (photoId: string, direction: 'left' | 'right') => {
    const currentIndex = photos.findIndex((photo) => photo.id === photoId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= photos.length) return;

    const updatedPhotos = [...photos];
    [updatedPhotos[currentIndex], updatedPhotos[newIndex]] = [
      updatedPhotos[newIndex],
      updatedPhotos[currentIndex],
    ];

    onPhotosChange(updatedPhotos);
  };

  if (!isHydrated) {
    return (
      <div className="space-y-2">
        <label className="block font-medium text-foreground">Photos</label>
        <div className="w-full h-64 bg-muted rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <label className="block font-medium text-foreground">
        Photos <span className="text-muted-foreground text-sm">(Optional)</span>
      </label>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 transition-smooth ${
          isDragging
            ? 'border-primary bg-primary/5' :'border-border bg-muted hover:border-primary/50'
        }`}
      >
        <input
          type="file"
          id="photo-upload"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="text-center pointer-events-none">
          <Icon name="PhotoIcon" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="font-medium text-foreground mb-2">
            Drag and drop photos here, or click to browse
          </p>
          <p className="text-sm text-muted-foreground">
            Supports JPG, PNG, WebP (Max 10MB per file)
          </p>
        </div>
      </div>

      {error && <p className="text-sm text-error">{error}</p>}

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="relative bg-card border border-border rounded-xl overflow-hidden group"
            >
              {/* Featured Badge */}
              {photo.isFeatured && (
                <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-lg flex items-center gap-1">
                  <Icon name="StarIcon" size={14} />
                  Featured
                </div>
              )}

              {/* Image */}
              <div className="aspect-video overflow-hidden bg-muted">
                <AppImage
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Controls Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex flex-col justify-between p-3">
                {/* Top Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleMovePhoto(photo.id, 'left')}
                      disabled={index === 0}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Move left"
                    >
                      <Icon name="ChevronLeftIcon" size={16} className="text-white" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMovePhoto(photo.id, 'right')}
                      disabled={index === photos.length - 1}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Move right"
                    >
                      <Icon name="ChevronRightIcon" size={16} className="text-white" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(photo.id)}
                    className="p-2 bg-error/80 backdrop-blur-sm rounded-lg hover:bg-error transition-smooth"
                    aria-label="Remove photo"
                  >
                    <Icon name="TrashIcon" size={16} className="text-white" />
                  </button>
                </div>

                {/* Bottom Controls */}
                <div className="flex items-center gap-2">
                  {!photo.isFeatured && (
                    <button
                      type="button"
                      onClick={() => handleSetFeatured(photo.id)}
                      className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-smooth text-white text-sm font-medium flex items-center gap-1"
                    >
                      <Icon name="StarIcon" size={14} />
                      Set as Featured
                    </button>
                  )}
                </div>
              </div>

              {/* Caption Input */}
              <div className="p-3 border-t border-border">
                {editingCaption === photo.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={photo.caption}
                      onChange={(e) => handleCaptionChange(photo.id, e.target.value)}
                      placeholder="Add a caption..."
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setEditingCaption(null)}
                      className="text-xs text-primary hover:underline"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setEditingCaption(photo.id)}
                    className="w-full text-left text-sm text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {photo.caption || 'Add a caption...'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoUploadSection;