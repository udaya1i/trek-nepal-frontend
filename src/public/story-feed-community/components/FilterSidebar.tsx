import { useState } from 'react';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import type { FilterSidebarProps } from '../types';

const FilterSidebar = ({ filters, onFilterChange, onReset }: FilterSidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'everest', label: 'Everest Region' },
    { value: 'annapurna', label: 'Annapurna Region' },
    { value: 'langtang', label: 'Langtang Region' },
    { value: 'manaslu', label: 'Manaslu Region' },
    { value: 'mustang', label: 'Mustang Region' }
  ];

  const difficultyOptions = [
    { value: '', label: 'All Difficulties' },
    { value: 'Easy', label: 'Easy' },
    { value: 'Moderate', label: 'Moderate' },
    { value: 'Hard', label: 'Hard' },
    { value: 'Expert', label: 'Expert' }
  ];

  const contentTypeOptions = [
    { value: '', label: 'All Content Types' },
    { value: 'Trail Condition', label: 'Trail Condition' },
    { value: 'Cultural Experience', label: 'Cultural Experience' },
    { value: 'Safety Update', label: 'Safety Update' },
    { value: 'Travel Tips', label: 'Travel Tips' },
    { value: 'Photo Story', label: 'Photo Story' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'trending', label: 'Trending' }
  ];

  return (
    <aside className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="Filter" size={20} />
          Filters
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden p-1 hover:bg-muted rounded-md transition-colors duration-200"
          aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
        >
          <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={20} />
        </button>
      </div>

      <div className={`p-4 space-y-4 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        <div>
          <Select
            label="Location"
            options={locationOptions}
            value={filters.location}
            onChange={(value) => onFilterChange({ ...filters, location: value as string })}
          />
        </div>

        <div>
          <Select
            label="Difficulty"
            options={difficultyOptions}
            value={filters.difficulty}
            onChange={(value) => onFilterChange({ ...filters, difficulty: value as string })}
          />
        </div>

        <div>
          <Select
            label="Content Type"
            options={contentTypeOptions}
            value={filters.contentType}
            onChange={(value) => onFilterChange({ ...filters, contentType: value as string })}
          />
        </div>

        <div>
          <Select
            label="Sort By"
            options={sortOptions}
            value={filters.sortBy}
            onChange={(value) => onFilterChange({ ...filters, sortBy: value as 'recent' | 'popular' | 'trending' })}
          />
        </div>

        <Button
          variant="outline"
          fullWidth
          iconName="RotateCcw"
          iconPosition="left"
          onClick={onReset}
        >
          Reset Filters
        </Button>
      </div>
    </aside>
  );
};

export default FilterSidebar;