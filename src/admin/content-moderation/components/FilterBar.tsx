import React from 'react';
import Icon from 'components/ui/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { FilterOptions } from '../types';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  pendingCount: number;
  onRefresh: () => void;
}

const FilterBar = ({
  filters,
  onFilterChange,
  pendingCount,
  onRefresh,
}: FilterBarProps) => {
  const contentTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'story', label: 'Stories' },
    { value: 'photo', label: 'Photos' },
    { value: 'video', label: 'Videos' },
    { value: 'review', label: 'Reviews' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'flagged', label: 'Flagged' },
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' },
  ];

  const userRatingOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '4', label: '4+ Stars' },
    { value: '3', label: '3+ Stars' },
    { value: '2', label: '2+ Stars' },
  ];

  const sortByOptions = [
    { value: 'date', label: 'Date' },
    { value: 'flags', label: 'Flag Count' },
    { value: 'views', label: 'View Count' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h2 className="text-base md:text-lg font-heading font-semibold text-foreground">
            Filter Content
          </h2>
          {pendingCount > 0 && (
            <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 text-xs font-medium bg-accent text-accent-foreground rounded-full">
              {pendingCount}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="RefreshCw"
          onClick={onRefresh}
        >
          <span className="sr-only">Refresh</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        <Select
          options={contentTypeOptions}
          value={filters.contentType}
          onChange={(value) =>
            onFilterChange({ ...filters, contentType: value as any })
          }
          placeholder="Content Type"
        />

        <Select
          options={statusOptions}
          value={filters.status}
          onChange={(value) =>
            onFilterChange({ ...filters, status: value as any })
          }
          placeholder="Status"
        />

        <Select
          options={dateRangeOptions}
          value={filters.dateRange}
          onChange={(value) =>
            onFilterChange({ ...filters, dateRange: value as any })
          }
          placeholder="Date Range"
        />

        <Select
          options={userRatingOptions}
          value={filters.userRating.toString()}
          onChange={(value) =>
            onFilterChange({
              ...filters,
              userRating: value === 'all' ? 'all' : parseInt(value),
            })
          }
          placeholder="User Rating"
        />

        <Select
          options={sortByOptions}
          value={filters.sortBy}
          onChange={(value) =>
            onFilterChange({ ...filters, sortBy: value as any })
          }
          placeholder="Sort By"
        />
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground caption">
          Showing filtered results
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            onFilterChange({
              contentType: 'all',
              status: 'all',
              dateRange: 'all',
              userRating: 'all',
              sortBy: 'date',
              sortOrder: 'desc',
            })
          }
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;