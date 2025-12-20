'use client';

import React, { useState } from 'react';
import AppImage from 'components/ui/AppImage';
import Icon from 'components/ui/AppIcon';

interface Photo {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

const PhotoGallery = ({ photos }: PhotoGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (photo: Photo, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => openLightbox(photo, index)}
            className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
          >
            <AppImage
              src={photo.url}
              alt={photo.alt}
              fill
              className="object-cover group-hover:scale-110 transition-smooth"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-smooth flex items-center justify-center">
              <Icon
                name="MagnifyingGlassPlusIcon"
                size={32}
                className="text-white opacity-0 group-hover:opacity-100 transition-smooth"
              />
            </div>
          </button>
        ))}
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-smooth"
            aria-label="Close lightbox"
          >
            <Icon name="XMarkIcon" size={24} className="text-white" />
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-smooth"
            aria-label="Previous photo"
          >
            <Icon name="ChevronLeftIcon" size={24} className="text-white" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-smooth"
            aria-label="Next photo"
          >
            <Icon name="ChevronRightIcon" size={24} className="text-white" />
          </button>

          <div className="max-w-6xl w-full">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <AppImage
                src={selectedPhoto.url}
                alt={selectedPhoto.alt}
                fill
                className="object-contain"
              />
            </div>
            {selectedPhoto.caption && (
              <p className="text-white text-center mt-4 text-lg">{selectedPhoto.caption}</p>
            )}
            <p className="text-white/60 text-center mt-2 text-sm">
              {currentIndex + 1} / {photos.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoGallery;