import { useState } from 'react';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { FilterOptions, ActiveFilters } from '../types';

interface FilterSidebarProps {
  filters: FilterOptions;
  activeFilters: ActiveFilters;
  onFilterChange: (filters: Partial<ActiveFilters>) => void;
  onClearFilters: () => void;
  resultCount: number;
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar = ({
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
  resultCount,
  isOpen,
  onClose,
}: FilterSidebarProps) => {
  const [localDuration, setLocalDuration] = useState(activeFilters.duration);
  const [localAltitude, setLocalAltitude] = useState(activeFilters.altitude);
  const [localBudget, setLocalBudget] = useState(activeFilters.budget);

  const difficultyColors = {
    Easy: 'bg-success text-success-foreground',
    Moderate: 'bg-warning text-warning-foreground',
    Hard: 'bg-[#F97316] text-white',
    Expert: 'bg-error text-error-foreground',
  };

  const locationOptions = [
    { value: '', label: 'All Locations' },
    ...filters.locations.map(loc => ({ value: loc, label: loc })),
  ];

  const seasonOptions = [
    { value: '', label: 'All Seasons' },
    ...filters.seasons.map(season => ({ value: season, label: season })),
  ];

  const handleDurationChange = (index: number, value: string) => {
    const newDuration: [number, number] = [...localDuration];
    newDuration[index] = parseInt(value) || 0;
    setLocalDuration(newDuration);
    onFilterChange({ duration: newDuration });
  };

  const handleAltitudeChange = (index: number, value: string) => {
    const newAltitude: [number, number] = [...localAltitude];
    newAltitude[index] = parseInt(value) || 0;
    setLocalAltitude(newAltitude);
    onFilterChange({ altitude: newAltitude });
  };

  const handleBudgetChange = (index: number, value: string) => {
    const newBudget: [number, number] = [...localBudget];
    newBudget[index] = parseInt(value) || 0;
    setLocalBudget(newBudget);
    onFilterChange({ budget: newBudget });
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-[1100] lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed lg:sticky top-[60px] left-0 h-[calc(100vh-60px)] w-80 bg-card border-r border-border overflow-y-auto z-[1200] transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Filters</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {resultCount} treks found
              </p>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-muted rounded-md transition-colors"
              aria-label="Close filters"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <Select
              label="Location"
              options={locationOptions}
              value={activeFilters.location}
              onChange={(value) => onFilterChange({ location: value as string })}
              placeholder="Select location"
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Difficulty Level
              </label>
              <div className="flex flex-wrap gap-2">
                {filters.difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() =>
                      onFilterChange({
                        difficulty: activeFilters.difficulty === diff ? '' : diff,
                      })
                    }
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      activeFilters.difficulty === diff
                        ? difficultyColors[diff]
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Duration (days)
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={localDuration[0]}
                    onChange={(e) => handleDurationChange(0, e.target.value)}
                    min={filters.durationRange[0]}
                    max={filters.durationRange[1]}
                  />
                  <span className="text-muted-foreground">to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={localDuration[1]}
                    onChange={(e) => handleDurationChange(1, e.target.value)}
                    min={filters.durationRange[0]}
                    max={filters.durationRange[1]}
                  />
                </div>
                <input
                  type="range"
                  min={filters.durationRange[0]}
                  max={filters.durationRange[1]}
                  value={localDuration[1]}
                  onChange={(e) => handleDurationChange(1, e.target.value)}
                  className="w-full accent-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Max Altitude (m)
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={localAltitude[0]}
                    onChange={(e) => handleAltitudeChange(0, e.target.value)}
                    min={filters.altitudeRange[0]}
                    max={filters.altitudeRange[1]}
                  />
                  <span className="text-muted-foreground">to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={localAltitude[1]}
                    onChange={(e) => handleAltitudeChange(1, e.target.value)}
                    min={filters.altitudeRange[0]}
                    max={filters.altitudeRange[1]}
                  />
                </div>
                <input
                  type="range"
                  min={filters.altitudeRange[0]}
                  max={filters.altitudeRange[1]}
                  value={localAltitude[1]}
                  onChange={(e) => handleAltitudeChange(1, e.target.value)}
                  className="w-full accent-primary"
                />
              </div>
            </div>

            <Select
              label="Best Season"
              options={seasonOptions}
              value={activeFilters.season}
              onChange={(value) => onFilterChange({ season: value as string })}
              placeholder="Select season"
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Budget (USD)
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={localBudget[0]}
                    onChange={(e) => handleBudgetChange(0, e.target.value)}
                    min={filters.budgetRange[0]}
                    max={filters.budgetRange[1]}
                  />
                  <span className="text-muted-foreground">to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={localBudget[1]}
                    onChange={(e) => handleBudgetChange(1, e.target.value)}
                    min={filters.budgetRange[0]}
                    max={filters.budgetRange[1]}
                  />
                </div>
                <input
                  type="range"
                  min={filters.budgetRange[0]}
                  max={filters.budgetRange[1]}
                  value={localBudget[1]}
                  onChange={(e) => handleBudgetChange(1, e.target.value)}
                  className="w-full accent-primary"
                />
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            fullWidth
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear All Filters
          </Button>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;