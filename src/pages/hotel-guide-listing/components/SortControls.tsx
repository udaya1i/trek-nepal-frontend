'use client';

import React from 'react';
import Icon from 'components/ui/AppIcon';

type SortOption = 'rating' | 'price-low' | 'price-high' | 'distance' | 'newest';

interface SortControlsProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: 'grid' | 'map';
  onViewModeChange: (mode: 'grid' | 'map') => void;
}

const SortControls = ({
  currentSort,
  onSortChange,
  viewMode,
  onViewModeChange,
}: SortControlsProps) => {
  const sortOptions: { value: SortOption; label: string; icon: string }[] = [
    { value: 'rating', label: 'Top Rated', icon: 'StarIcon' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUpIcon' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDownIcon' },
    { value: 'distance', label: 'Nearest', icon: 'MapPinIcon' },
    { value: 'newest', label: 'Newest', icon: 'ClockIcon' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      {/* Sort Dropdown */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <label className="text-sm font-medium text-foreground whitespace-nowrap">
          Sort by:
        </label>
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="flex-1 sm:flex-none h-12 px-4 pr-10 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth appearance-none cursor-pointer"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onViewModeChange('grid')}
          className={`h-12 px-4 rounded-xl font-medium transition-smooth flex items-center gap-2 ${
            viewMode === 'grid' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground hover:bg-muted/80'
          }`}
          aria-label="Grid view"
        >
          <Icon name="Squares2X2Icon" size={20} />
          <span className="hidden sm:inline">Grid</span>
        </button>
        <button
          onClick={() => onViewModeChange('map')}
          className={`h-12 px-4 rounded-xl font-medium transition-smooth flex items-center gap-2 ${
            viewMode === 'map' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground hover:bg-muted/80'
          }`}
          aria-label="Map view"
        >
          <Icon name="MapIcon" size={20} />
          <span className="hidden sm:inline">Map</span>
        </button>
      </div>
    </div>
  );
};

export default SortControls;