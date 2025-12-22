import React from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import { Trek, SortConfig } from '../types';
import Icon from 'components/ui/AppIcon';

interface TrekTableProps {
  treks: Trek[];
  selectedTreks: string[];
  onSelectTrek: (id: string) => void;
  onSelectAll: () => void;
  onEdit: (trek: Trek) => void;
  onStatusToggle: (trek: Trek) => void;
  sortConfig: SortConfig;
  onSort: (field: keyof Trek) => void;
}

const TrekTable = ({
  treks,
  selectedTreks,
  onSelectTrek,
  onSelectAll,
  onEdit,
  onStatusToggle,
  sortConfig,
  onSort,
}: TrekTableProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-success/10 text-success';
      case 'Moderate':
        return 'bg-primary/10 text-primary';
      case 'Challenging':
        return 'bg-warning/10 text-warning';
      case 'Strenuous':
        return 'bg-accent/10 text-accent';
      case 'Extreme':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-success/10 text-success';
      case 'Draft':
        return 'bg-muted text-muted-foreground';
      case 'Under Review':
        return 'bg-warning/10 text-warning';
      case 'Archived':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const SortIcon = ({ field }: { field: keyof Trek }) => {
    if (sortConfig.field !== field) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig.direction === 'asc' ? (
      <Icon name="ArrowUp" size={14} className="text-primary" />
    ) : (
      <Icon name="ArrowDown" size={14} className="text-primary" />
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left">
                <Checkbox
                  checked={selectedTreks.length === treks.length && treks.length > 0}
                  onChange={onSelectAll}
                />
              </th>
              <th
                className="px-4 py-3 text-left text-sm font-medium text-foreground cursor-pointer hover:bg-muted/70 transition-smooth"
                onClick={() => onSort('name')}
              >
                <div className="flex items-center gap-2">
                  Trek Name
                  <SortIcon field="name" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-sm font-medium text-foreground cursor-pointer hover:bg-muted/70 transition-smooth"
                onClick={() => onSort('difficulty')}
              >
                <div className="flex items-center gap-2">
                  Difficulty
                  <SortIcon field="difficulty" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-sm font-medium text-foreground cursor-pointer hover:bg-muted/70 transition-smooth"
                onClick={() => onSort('duration')}
              >
                <div className="flex items-center gap-2">
                  Duration
                  <SortIcon field="duration" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                Region
              </th>
              <th
                className="px-4 py-3 text-left text-sm font-medium text-foreground cursor-pointer hover:bg-muted/70 transition-smooth"
                onClick={() => onSort('status')}
              >
                <div className="flex items-center gap-2">
                  Status
                  <SortIcon field="status" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-sm font-medium text-foreground cursor-pointer hover:bg-muted/70 transition-smooth"
                onClick={() => onSort('lastUpdated')}
              >
                <div className="flex items-center gap-2">
                  Last Updated
                  <SortIcon field="lastUpdated" />
                </div>
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {treks.map((trek) => (
              <tr
                key={trek.id}
                className="hover:bg-muted/30 transition-smooth cursor-pointer"
                onClick={() => onEdit(trek)}
              >
                <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedTreks.includes(trek.id)}
                    onChange={() => onSelectTrek(trek.id)}
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    {trek.featured && (
                      <Icon name="Star" size={16} className="text-accent flex-shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-1">
                        {trek.name}
                      </p>
                      <p className="text-xs text-muted-foreground caption line-clamp-1">
                        {trek.route.startPoint} → {trek.route.endPoint}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                      trek.difficulty
                    )}`}
                  >
                    {trek.difficulty}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-foreground whitespace-nowrap">
                    {trek.duration} days
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-foreground">{trek.region}</span>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      trek.status
                    )}`}
                  >
                    {trek.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-muted-foreground caption whitespace-nowrap">
                    {formatDate(trek.lastUpdated)}
                  </span>
                </td>
                <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(trek)}
                      iconName="Edit"
                      iconSize={16}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onStatusToggle(trek)}
                      iconName={trek.status === 'Published' ? 'EyeOff' : 'Eye'}
                      iconSize={16}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {treks.length === 0 && (
        <div className="py-12 text-center">
          <Icon name="Mountain" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">No treks found</p>
        </div>
      )}
    </div>
  );
};

export default TrekTable;