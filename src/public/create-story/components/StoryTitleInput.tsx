'use client';

import React from 'react';

interface StoryTitleInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const StoryTitleInput = ({ value, onChange, error }: StoryTitleInputProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="story-title" className="block font-medium text-foreground">
        Story Title <span className="text-accent">*</span>
      </label>
      <input
        id="story-title"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your story title..."
        maxLength={100}
        className={`w-full px-6 py-4 text-2xl font-heading font-semibold bg-background border-2 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-3 focus:ring-ring transition-smooth ${
          error ? 'border-error' : 'border-border'
        }`}
      />
      <div className="flex items-center justify-between">
        {error && <p className="text-sm text-error">{error}</p>}
        <p className="text-sm text-muted-foreground ml-auto">
          {value.length}/100 characters
        </p>
      </div>
    </div>
  );
};

export default StoryTitleInput;