

import React, { useState } from 'react';
import AppImage from 'components/ui/AppImage';
import Icon from 'components/ui/AppIcon';

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  providerName: string;
}

const ImageGallery = ({ images, providerName }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      handleNext();
    }
    if (touchStart - touchEnd < -75) {
      handlePrevious();
    }
  };

  return (
    <>
      {/* Main Gallery */}
      <div className="relative">
        {/* Main Image */}
        <div
          className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-muted rounded-xl overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AppImage
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
            className="w-full h-full object-cover"
          />

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/90 hover:bg-background rounded-full flex items-center justify-center transition-smooth shadow-warm-md"
            aria-label="Previous image"
          >
            <Icon name="ChevronLeftIcon" size={24} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/90 hover:bg-background rounded-full flex items-center justify-center transition-smooth shadow-warm-md"
            aria-label="Next image"
          >
            <Icon name="ChevronRightIcon" size={24} />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-4 right-4 w-10 h-10 bg-background/90 hover:bg-background rounded-lg flex items-center justify-center transition-smooth shadow-warm-md"
            aria-label="View fullscreen"
          >
            <Icon name="ArrowsPointingOutIcon" size={20} />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-background/90 rounded-full text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => handleThumbnailClick(index)}
              className={`relative aspect-square rounded-lg overflow-hidden transition-smooth ${
                index === currentIndex
                  ? 'ring-3 ring-primary scale-95' :'hover:scale-95 opacity-70 hover:opacity-100'
              }`}
            >
              <AppImage
                src={image.url}
                alt={`Thumbnail ${index + 1} of ${providerName}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[300] bg-background/95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 w-12 h-12 bg-muted hover:bg-muted/80 rounded-full flex items-center justify-center transition-smooth"
            aria-label="Close fullscreen"
          >
            <Icon name="XMarkIcon" size={24} />
          </button>

          <div className="relative w-full max-w-6xl h-full max-h-[90vh] flex items-center justify-center">
            <AppImage
              src={images[currentIndex].url}
              alt={images[currentIndex].alt}
              className="max-w-full max-h-full object-contain"
            />

            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-muted hover:bg-muted/80 rounded-full flex items-center justify-center transition-smooth"
              aria-label="Previous image"
            >
              <Icon name="ChevronLeftIcon" size={24} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-muted hover:bg-muted/80 rounded-full flex items-center justify-center transition-smooth"
              aria-label="Next image"
            >
              <Icon name="ChevronRightIcon" size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-muted rounded-full text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;