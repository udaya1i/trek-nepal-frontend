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

interface Trek {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Expert';
  duration: string;
}

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  photos: Photo[];
  treks: Trek[];
  category: string;
}

const PreviewModal = ({
  isOpen,
  onClose,
  title,
  content,
  photos,
  treks,
  category,
}: PreviewModalProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isHydrated]);

  if (!isOpen || !isHydrated) return null;

  const featuredPhoto = photos.find((photo) => photo.isFeatured) || photos[0];

  const formatContent = (text: string) => {
    return text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return (
            <h1 key={index} className="text-3xl font-heading font-semibold mb-4">
              {line.substring(2)}
            </h1>
          );
        }
        if (line.startsWith('## ')) {
          return (
            <h2 key={index} className="text-2xl font-heading font-semibold mb-3">
              {line.substring(3)}
            </h2>
          );
        }
        if (line.startsWith('### ')) {
          return (
            <h3 key={index} className="text-xl font-heading font-medium mb-3">
              {line.substring(4)}
            </h3>
          );
        }
        if (line.startsWith('- ')) {
          return (
            <li key={index} className="ml-6 mb-2">
              {line.substring(2)}
            </li>
          );
        }
        return (
          <p key={index} className="mb-4">
            {line}
          </p>
        );
      });
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-card rounded-2xl shadow-warm-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-foreground">Story Preview</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-smooth"
            aria-label="Close preview"
          >
            <Icon name="XMarkIcon" size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Featured Image */}
          {featuredPhoto && (
            <div className="aspect-video rounded-xl overflow-hidden mb-6">
              <AppImage
                src={featuredPhoto.url}
                alt={featuredPhoto.alt}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Category */}
          {category && (
            <div className="mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-lg">
                {category}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl font-heading font-bold text-foreground mb-6">{title}</h1>

          {/* Tagged Treks */}
          {treks.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {treks.map((trek) => (
                <div
                  key={trek.id}
                  className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg"
                >
                  <Icon name="MapIcon" size={14} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{trek.name}</span>
                </div>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none text-foreground">
            {formatContent(content)}
          </div>

          {/* Photo Gallery */}
          {photos.length > 1 && (
            <div className="mt-8">
              <h3 className="text-xl font-heading font-semibold mb-4">Photo Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="aspect-square rounded-xl overflow-hidden">
                    <AppImage
                      src={photo.url}
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-muted text-foreground rounded-xl font-medium hover:bg-muted/80 transition-smooth"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;