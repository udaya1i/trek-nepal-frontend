import React from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { ModerationAction } from '../types';

interface BulkActionsBarProps {
  selectedCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onBulkAction: (action: ModerationAction) => void;
}

const BulkActionsBar = ({
  selectedCount,
  onSelectAll,
  onDeselectAll,
  onBulkAction,
}: BulkActionsBarProps) => {
  const [selectedAction, setSelectedAction] = React.useState<string>('');

  const actionOptions = [
    { value: '', label: 'Select Action' },
    { value: 'approve', label: 'Approve Selected' },
    { value: 'reject', label: 'Reject Selected' },
    { value: 'flag', label: 'Flag Selected' },
  ];

  const handleApplyAction = () => {
    if (selectedAction && selectedCount > 0) {
      onBulkAction(selectedAction as ModerationAction);
      setSelectedAction('');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedCount > 0}
              onChange={selectedCount > 0 ? onDeselectAll : onSelectAll}
              className="w-5 h-5 rounded border-2 border-border cursor-pointer"
              aria-label="Select all items"
            />
            <span className="text-sm font-medium text-foreground">
              {selectedCount > 0 ? (
                <>
                  <span className="text-accent">{selectedCount}</span> selected
                </>
              ) : (
                'Select items'
              )}
            </span>
          </div>

          {selectedCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDeselectAll}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear selection
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex-1 sm:flex-initial sm:w-48">
            <Select
              options={actionOptions}
              value={selectedAction}
              onChange={setSelectedAction}
              disabled={selectedCount === 0}
              placeholder="Select Action"
            />
          </div>
          <Button
            variant="default"
            size="sm"
            iconName="Check"
            onClick={handleApplyAction}
            disabled={!selectedAction || selectedCount === 0}
          >
            Apply
          </Button>
        </div>
      </div>

      {selectedCount > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="success"
              size="sm"
              iconName="Check"
              iconPosition="left"
              onClick={() => onBulkAction('approve')}
            >
              Approve All
            </Button>
            <Button
              variant="destructive"
              size="sm"
              iconName="X"
              iconPosition="left"
              onClick={() => onBulkAction('reject')}
            >
              Reject All
            </Button>
            <Button
              variant="warning"
              size="sm"
              iconName="Flag"
              iconPosition="left"
              onClick={() => onBulkAction('flag')}
            >
              Flag All
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActionsBar;