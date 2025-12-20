'use client';

import React, { useState } from 'react';
import Icon from 'components/ui/AppIcon';

interface FilterOptions {
  location: string;
  serviceType: 'all' | 'hotels' | 'guides';
  priceRange: [number, number];
  amenities: string[];
  verifiedOnly: boolean;
}

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  resultCount: number;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const FilterPanel = ({
  filters,
  onFilterChange,
  resultCount,
  isMobileOpen,
  onMobileClose,
}: FilterPanelProps) => {
  const locations = [
    'All Locations',
    'Kathmandu',
    'Pokhara',
    'Lukla',
    'Namche Bazaar',
    'Jomsom',
    'Manang',
    'Ghandruk',
    'Poon Hill',
  ];

  const amenitiesList = [
    'WiFi',
    'Hot Shower',
    'Restaurant',
    'Laundry',
    'Parking',
    'Heating',
    'Power Backup',
    'Mountain View',
  ];

  const handleLocationChange = (location: string) => {
    onFilterChange({ ...filters, location });
  };

  const handleServiceTypeChange = (serviceType: 'all' | 'hotels' | 'guides') => {
    onFilterChange({ ...filters, serviceType });
  };

  const handlePriceRangeChange = (value: number, index: 0 | 1) => {
    const newRange: [number, number] = [...filters.priceRange] as [number, number];
    newRange[index] = value;
    onFilterChange({ ...filters, priceRange: newRange });
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    onFilterChange({ ...filters, amenities: newAmenities });
  };

  const handleVerifiedToggle = () => {
    onFilterChange({ ...filters, verifiedOnly: !filters.verifiedOnly });
  };

  const handleClearFilters = () => {
    onFilterChange({
      location: 'All Locations',
      serviceType: 'all',
      priceRange: [0, 200],
      amenities: [],
      verifiedOnly: false,
    });
  };

  const filterContent = (
    <div className="space-y-6">
      {/* Location Filter */}
      <div>
        <label className="block font-medium text-foreground mb-3">Location</label>
        <select
          value={filters.location}
          onChange={(e) => handleLocationChange(e.target.value)}
          className="w-full h-12 px-4 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
        >
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Service Type Toggle */}
      <div>
        <label className="block font-medium text-foreground mb-3">Service Type</label>
        <div className="flex gap-2">
          {(['all', 'hotels', 'guides'] as const).map((type) => (
            <button
              key={type}
              onClick={() => handleServiceTypeChange(type)}
              className={`flex-1 h-12 px-4 rounded-xl font-medium transition-smooth ${
                filters.serviceType === type
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <label className="block font-medium text-foreground mb-3">
          Price Range (USD/night)
        </label>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="200"
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceRangeChange(Number(e.target.value), 0)}
              className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <span className="data-text text-sm text-foreground w-16 text-right">
              ${filters.priceRange[0]}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="200"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceRangeChange(Number(e.target.value), 1)}
              className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <span className="data-text text-sm text-foreground w-16 text-right">
              ${filters.priceRange[1]}
            </span>
          </div>
        </div>
      </div>

      {/* Amenities Checkboxes */}
      <div>
        <label className="block font-medium text-foreground mb-3">Amenities</label>
        <div className="grid grid-cols-2 gap-3">
          {amenitiesList.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
                className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-ring cursor-pointer"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-smooth">
                {amenity}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Verified Only Toggle */}
      <div>
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="font-medium text-foreground">Verified Only</span>
          <div className="relative">
            <input
              type="checkbox"
              checked={filters.verifiedOnly}
              onChange={handleVerifiedToggle}
              className="sr-only peer"
            />
            <div className="w-14 h-8 bg-muted rounded-full peer-checked:bg-primary transition-smooth"></div>
            <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-smooth peer-checked:translate-x-6"></div>
          </div>
        </label>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={handleClearFilters}
        className="w-full h-12 px-4 bg-muted text-foreground rounded-xl font-medium hover:bg-muted/80 transition-smooth flex items-center justify-center gap-2"
      >
        <Icon name="XMarkIcon" size={20} />
        Clear All Filters
      </button>
    </div>
  );

  // Desktop View
  if (!isMobileOpen) {
    return (
      <div className="hidden lg:block w-80 flex-shrink-0">
        <div className="sticky top-24 bg-card border border-border rounded-xl p-6 shadow-warm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-semibold text-xl text-foreground">Filters</h2>
            <span className="caption text-muted-foreground">
              {resultCount} {resultCount === 1 ? 'result' : 'results'}
            </span>
          </div>
          {filterContent}
        </div>
      </div>
    );
  }

  // Mobile Slide-out Panel
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[150] lg:hidden"
        onClick={onMobileClose}
      />

      {/* Slide-out Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-card z-[200] lg:hidden overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <h2 className="font-heading font-semibold text-xl text-foreground">Filters</h2>
          <button
            onClick={onMobileClose}
            className="p-2 rounded-lg hover:bg-muted transition-smooth"
            aria-label="Close filters"
          >
            <Icon name="XMarkIcon" size={24} />
          </button>
        </div>
        <div className="p-6">
          {filterContent}
          <button
            onClick={onMobileClose}
            className="w-full h-12 px-4 bg-primary text-primary-foreground rounded-xl font-medium hover:scale-[0.97] transition-smooth mt-6"
          >
            Show {resultCount} {resultCount === 1 ? 'Result' : 'Results'}
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;