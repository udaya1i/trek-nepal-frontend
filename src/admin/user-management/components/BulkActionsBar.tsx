import React from 'react';
 import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from 'components/ui/AppIcon';

interface BulkActionsBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkAction: (action: string) => void;
}

const BulkActionsBar = ({
  selectedCount,
  onClearSelection,
  onBulkAction,
}: BulkActionsBarProps) => {
  const bulkActionOptions = [
    { value: '', label: 'Select Action' },
    { value: 'activate', label: 'Activate Accounts' },
    { value: 'deactivate', label: 'Deactivate Accounts' },
    { value: 'suspend', label: 'Suspend Accounts' },
    { value: 'verify', label: 'Verify Accounts' },
    { value: 'export', label: 'Export Selected' },
  ];

  if (selectedCount === 0) return null;

  return (
    <div className="w-full min-w-0 bg-primary text-primary-foreground rounded-lg p-4 shadow-elevation-2">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/20">
            <Icon name="CheckSquare" size={20} />
          </div>
          <div>
            <p className="text-sm font-medium">
              {selectedCount} user{selectedCount !== 1 ? 's' : ''} selected
            </p>
            <button
              onClick={onClearSelection}
              className="text-xs opacity-80 hover:opacity-100 transition-smooth underline"
            >
              Clear selection
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select
            options={bulkActionOptions}
            value=""
            onChange={(value) => value && onBulkAction(value as string)}
            placeholder="Select Action"
            className="flex-1 sm:flex-initial sm:w-48"
          />
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={() => onBulkAction('export')}
            className="flex-shrink-0"
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;