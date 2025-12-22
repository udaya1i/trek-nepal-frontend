import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { BulkAction } from '../types';
import Icon from 'components/ui/AppIcon';

interface BulkActionsBarProps {
  selectedCount: number;
  onAction: (action: BulkAction) => void;
  onClearSelection: () => void;
}

const BulkActionsBar = ({
  selectedCount,
  onAction,
  onClearSelection,
}: BulkActionsBarProps) => {
  const [selectedAction, setSelectedAction] = React.useState<string>('');

  const actionOptions = [
    { value: 'publish', label: 'Publish Selected' },
    { value: 'draft', label: 'Move to Draft' },
    { value: 'archive', label: 'Archive Selected' },
    { value: 'feature', label: 'Mark as Featured' },
    { value: 'unfeature', label: 'Remove Featured' },
    { value: 'export', label: 'Export Selected' },
    { value: 'delete', label: 'Delete Selected' },
  ];

  const handleApply = () => {
    if (!selectedAction) return;

    const actionMap: Record<string, BulkAction> = {
      publish: { type: 'status', value: 'Published' },
      draft: { type: 'status', value: 'Draft' },
      archive: { type: 'status', value: 'Archived' },
      feature: { type: 'featured', value: true },
      unfeature: { type: 'featured', value: false },
      export: { type: 'export' },
      delete: { type: 'delete' },
    };

    onAction(actionMap[selectedAction]);
    setSelectedAction('');
  };

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] animate-slideUp">
      <div className="bg-card border border-border rounded-lg shadow-elevation-4 p-4 flex items-center gap-4 min-w-[320px] md:min-w-[480px]">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="CheckSquare" size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {selectedCount} trek{selectedCount !== 1 ? 's' : ''} selected
            </p>
            <p className="text-xs text-muted-foreground caption">
              Choose an action to apply
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-center gap-2">
          <Select
            placeholder="Select action..."
            options={actionOptions}
            value={selectedAction}
            onChange={(value) => setSelectedAction(value as string)}
            className="flex-1"
          />
          <Button
            variant="default"
            size="sm"
            onClick={handleApply}
            disabled={!selectedAction}
            iconName="Check"
            iconSize={16}
          >
            Apply
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onClearSelection}
          iconName="X"
          iconSize={18}
        />
      </div>
    </div>
  );
};

export default BulkActionsBar;