import React from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import { TrekFilters } from '../types';
import Icon from 'components/ui/AppIcon';

interface TrekFiltersProps {
  filters: TrekFilters;
  onFilterChange: (filters: TrekFilters) => void;
  onReset: () => void;
  resultCount: number;
}

const TrekFiltersComponent = ({
  filters,
  onFilterChange,
  onReset,
  resultCount,
}: TrekFiltersProps) => {
  const difficultyOptions = [
    { value: 'Easy', label: 'Easy' },
    { value: 'Moderate', label: 'Moderate' },
    { value: 'Challenging', label: 'Challenging' },
    { value: 'Strenuous', label: 'Strenuous' },
    { value: 'Extreme', label: 'Extreme' },
  ];

  const regionOptions = [
    { value: 'Everest', label: 'Everest Region' },
    { value: 'Annapurna', label: 'Annapurna Region' },
    { value: 'Langtang', label: 'Langtang Region' },
    { value: 'Manaslu', label: 'Manaslu Region' },
    { value: 'Mustang', label: 'Mustang Region' },
  ];

  const statusOptions = [
    { value: 'Published', label: 'Published' },
    { value: 'Draft', label: 'Draft' },
    { value: 'Under Review', label: 'Under Review' },
    { value: 'Archived', label: 'Archived' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Filters
          </h3>
          <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
            {resultCount} results
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <Icon name="X" size={16} />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          type="search"
          placeholder="Search treks..."
          value={filters.search}
          onChange={(e) =>
            onFilterChange({ ...filters, search: e.target.value })
          }
          className="w-full"
        />

        <Select
          placeholder="Difficulty"
          options={difficultyOptions}
          value={filters.difficulty}
          onChange={(value) =>
            onFilterChange({ ...filters, difficulty: value as string[] })
          }
          multiple
          searchable
        />

        <Select
          placeholder="Region"
          options={regionOptions}
          value={filters.region}
          onChange={(value) =>
            onFilterChange({ ...filters, region: value as string[] })
          }
          multiple
          searchable
        />

        <Select
          placeholder="Status"
          options={statusOptions}
          value={filters.status}
          onChange={(value) =>
            onFilterChange({ ...filters, status: value as string[] })
          }
          multiple
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="flex items-center gap-4">
          <Input
            type="number"
            label="Min Duration (days)"
            placeholder="0"
            value={filters.durationMin || ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                durationMin: parseInt(e.target.value) || 0,
              })
            }
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-4">
          <Input
            type="number"
            label="Max Duration (days)"
            placeholder="30"
            value={filters.durationMax || ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                durationMax: parseInt(e.target.value) || 30,
              })
            }
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Checkbox
            label="Permit Required"
            checked={filters.permitRequired === true}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                permitRequired: e.target.checked ? true : null,
              })
            }
          />
          <Checkbox
            label="Featured Only"
            checked={filters.featured === true}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                featured: e.target.checked ? true : null,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default TrekFiltersComponent;