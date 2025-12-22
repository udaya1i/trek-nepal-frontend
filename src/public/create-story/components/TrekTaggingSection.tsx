'use client';

import React, { useState, useEffect, useRef } from 'react';
import Icon from 'components/ui/AppIcon';

interface Trek {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Expert';
  duration: string;
}

interface TrekTaggingSectionProps {
  selectedTreks: Trek[];
  onTreksChange: (treks: Trek[]) => void;
}

const TrekTaggingSection = ({ selectedTreks, onTreksChange }: TrekTaggingSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredTreks, setFilteredTreks] = useState<Trek[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allTreks: Trek[] = [
    { id: '1', name: 'Everest Base Camp Trek', difficulty: 'Hard', duration: '12 days' },
    { id: '2', name: 'Annapurna Circuit', difficulty: 'Hard', duration: '15 days' },
    { id: '3', name: 'Langtang Valley Trek', difficulty: 'Moderate', duration: '7 days' },
    { id: '4', name: 'Manaslu Circuit Trek', difficulty: 'Expert', duration: '14 days' },
    { id: '5', name: 'Ghorepani Poon Hill Trek', difficulty: 'Easy', duration: '4 days' },
    { id: '6', name: 'Upper Mustang Trek', difficulty: 'Moderate', duration: '10 days' },
    { id: '7', name: 'Kanchenjunga Base Camp', difficulty: 'Expert', duration: '20 days' },
    { id: '8', name: 'Mardi Himal Trek', difficulty: 'Moderate', duration: '5 days' },
  ];

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isHydrated]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredTreks(allTreks);
      return;
    }

    const filtered = allTreks.filter(
      (trek) =>
        trek.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !selectedTreks.some((selected) => selected.id === trek.id)
    );
    setFilteredTreks(filtered);
  }, [searchQuery, selectedTreks]);

  const handleAddTrek = (trek: Trek) => {
    if (!selectedTreks.some((selected) => selected.id === trek.id)) {
      onTreksChange([...selectedTreks, trek]);
      setSearchQuery('');
      setIsDropdownOpen(false);
    }
  };

  const handleRemoveTrek = (trekId: string) => {
    onTreksChange(selectedTreks.filter((trek) => trek.id !== trekId));
  };

  const getDifficultyColor = (difficulty: Trek['difficulty']) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-success/10 text-success';
      case 'Moderate':
        return 'bg-warning/10 text-warning';
      case 'Hard':
        return 'bg-accent/10 text-accent';
      case 'Expert':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (!isHydrated) {
    return (
      <div className="space-y-2">
        <label className="block font-medium text-foreground">Tag Treks</label>
        <div className="w-full h-12 bg-muted rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <label className="block font-medium text-foreground">
        Tag Treks <span className="text-muted-foreground text-sm">(Optional)</span>
      </label>

      {/* Search Input */}
      <div ref={dropdownRef} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            placeholder="Search for treks to tag..."
            className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-3 focus:ring-ring transition-smooth"
          />
          <Icon
            name="MagnifyingGlassIcon"
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
        </div>

        {/* Dropdown */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-warm-lg overflow-hidden z-50 max-h-64 overflow-y-auto">
            {filteredTreks.length > 0 ? (
              <div className="py-2">
                {filteredTreks.map((trek) => (
                  <button
                    key={trek.id}
                    type="button"
                    onClick={() => handleAddTrek(trek)}
                    className="w-full px-4 py-3 text-left hover:bg-muted transition-smooth flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">{trek.name}</div>
                      <div className="text-sm text-muted-foreground">{trek.duration}</div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium ${getDifficultyColor(
                        trek.difficulty
                      )}`}
                    >
                      {trek.difficulty}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">No treks found</div>
            )}
          </div>
        )}
      </div>

      {/* Selected Treks */}
      {selectedTreks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTreks.map((trek) => (
            <div
              key={trek.id}
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl"
            >
              <Icon name="MapIcon" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">{trek.name}</span>
              <button
                type="button"
                onClick={() => handleRemoveTrek(trek.id)}
                className="p-1 rounded-lg hover:bg-primary/20 transition-smooth"
                aria-label={`Remove ${trek.name}`}
              >
                <Icon name="XMarkIcon" size={14} className="text-primary" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrekTaggingSection;