'use client';

import React, { useState, useEffect } from 'react';
import Icon from 'components/ui/AppIcon';

interface PublishingControlsProps {
  visibility: 'public' | 'private';
  onVisibilityChange: (visibility: 'public' | 'private') => void;
  category: string;
  onCategoryChange: (category: string) => void;
}

const PublishingControls = ({
  visibility,
  onVisibilityChange,
  category,
  onCategoryChange,
}: PublishingControlsProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  const categories = [
    'Trek Experience',
    'Travel Tips',
    'Photography',
    'Culture & People',
    'Adventure',
    'Safety & Preparation',
    'Food & Accommodation',
    'Other',
  ];

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        <div className="w-full h-12 bg-muted rounded-xl animate-pulse" />
        <div className="w-full h-12 bg-muted rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Visibility Control */}
      <div className="space-y-3">
        <label className="block font-medium text-foreground">Visibility</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onVisibilityChange('public')}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-smooth ${
              visibility === 'public' ?'border-primary bg-primary/10 text-primary' :'border-border bg-background text-foreground hover:border-primary/50'
            }`}
          >
            <Icon name="GlobeAltIcon" size={20} />
            <span className="font-medium">Public</span>
          </button>
          <button
            type="button"
            onClick={() => onVisibilityChange('private')}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-smooth ${
              visibility === 'private' ?'border-primary bg-primary/10 text-primary' :'border-border bg-background text-foreground hover:border-primary/50'
            }`}
          >
            <Icon name="LockClosedIcon" size={20} />
            <span className="font-medium">Private</span>
          </button>
        </div>
        <p className="text-sm text-muted-foreground">
          {visibility === 'public' ?'Anyone can view and share your story' :'Only you can view this story'}
        </p>
      </div>

      {/* Category Selection */}
      <div className="space-y-3">
        <label htmlFor="category" className="block font-medium text-foreground">
          Category <span className="text-accent">*</span>
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-3 focus:ring-ring transition-smooth"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PublishingControls;