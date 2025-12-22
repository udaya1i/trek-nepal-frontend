import React from 'react';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { FilterOptions } from '../types';

interface UserFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  onReset: () => void;
}

const UserFilters = ({
  filters,
  onFilterChange,
  onSearch,
  searchQuery,
  onReset,
}: UserFiltersProps) => {
  const accountTypeOptions = [
    { value: 'all', label: 'All Account Types' },
    { value: 'trekker', label: 'Trekker' },
    { value: 'guide', label: 'Guide' },
    { value: 'hotel_owner', label: 'Hotel Owner' },
    { value: 'admin', label: 'Admin' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'pending', label: 'Pending' },
  ];

  const activityLevelOptions = [
    { value: 'all', label: 'All Activity Levels' },
    { value: 'high', label: 'High Activity' },
    { value: 'medium', label: 'Medium Activity' },
    { value: 'low', label: 'Low Activity' },
  ];

  const verificationOptions = [
    { value: 'all', label: 'All Verification Status' },
    { value: 'verified', label: 'Verified' },
    { value: 'unverified', label: 'Unverified' },
    { value: 'pending', label: 'Pending Verification' },
  ];

  return (
    <div className="w-full min-w-0 bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
          Filter Users
        </h3>
        <Button
          variant="outline"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={onReset}
        >
          Reset Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="w-full min-w-0">
          <Input
            type="search"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full"
          />
        </div>

        <Select
          options={accountTypeOptions}
          value={filters.accountType[0] || 'all'}
          onChange={(value) =>
            onFilterChange({
              ...filters,
              accountType: value === 'all' ? [] : [value as string],
            })
          }
          placeholder="Account Type"
        />

        <Select
          options={statusOptions}
          value={filters.status[0] || 'all'}
          onChange={(value) =>
            onFilterChange({
              ...filters,
              status: value === 'all' ? [] : [value as string],
            })
          }
          placeholder="Status"
        />

        <Select
          options={activityLevelOptions}
          value={filters.activityLevel[0] || 'all'}
          onChange={(value) =>
            onFilterChange({
              ...filters,
              activityLevel: value === 'all' ? [] : [value as string],
            })
          }
          placeholder="Activity Level"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          options={verificationOptions}
          value={filters.verificationStatus[0] || 'all'}
          onChange={(value) =>
            onFilterChange({
              ...filters,
              verificationStatus: value === 'all' ? [] : [value as string],
            })
          }
          placeholder="Verification Status"
        />

        <Input
          type="date"
          label="Registration From"
          value={
            filters.registrationPeriod.start
              ? filters.registrationPeriod.start.toISOString().split('T')[0]
              : ''
          }
          onChange={(e) =>
            onFilterChange({
              ...filters,
              registrationPeriod: {
                ...filters.registrationPeriod,
                start: e.target.value ? new Date(e.target.value) : null,
              },
            })
          }
        />

        <Input
          type="date"
          label="Registration To"
          value={
            filters.registrationPeriod.end
              ? filters.registrationPeriod.end.toISOString().split('T')[0]
              : ''
          }
          onChange={(e) =>
            onFilterChange({
              ...filters,
              registrationPeriod: {
                ...filters.registrationPeriod,
                end: e.target.value ? new Date(e.target.value) : null,
              },
            })
          }
        />
      </div>
    </div>
  );
};

export default UserFilters;