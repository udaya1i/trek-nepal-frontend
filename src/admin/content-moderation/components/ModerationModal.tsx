import React, { useState } from 'react';
import Icon from 'components/ui/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import { ContentItem, ModerationAction, ViolationType } from '../types';
import AppImage from 'components/ui/AppImage';

interface ModerationModalProps {
  content: ContentItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: ModerationAction, reason?: string, violations?: ViolationType[]) => void;
}

const ModerationModal = ({
  content,
  isOpen,
  onClose,
  onAction,
}: ModerationModalProps) => {
  const [selectedViolations, setSelectedViolations] = useState<ViolationType[]>([]);
  const [notes, setNotes] = useState('');
  const [guidelineChecks, setGuidelineChecks] = useState({
    appropriate: false,
    accurate: false,
    quality: false,
    original: false,
  });

  if (!isOpen || !content) return null;

  const handleViolationToggle = (violation: ViolationType) => {
    setSelectedViolations((prev) =>
      prev.includes(violation)
        ? prev.filter((v) => v !== violation)
        : [...prev, violation]
    );
  };

  const handleApprove = () => {
    if (Object.values(guidelineChecks).every((check) => check)) {
      onAction('approve', notes);
      handleClose();
    }
  };

  const handleReject = () => {
    if (selectedViolations.length > 0 || notes) {
      onAction('reject', notes, selectedViolations);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedViolations([]);
    setNotes('');
    setGuidelineChecks({
      appropriate: false,
      accurate: false,
      quality: false,
      original: false,
    });
    onClose();
  };

  const allGuidelinesChecked = Object.values(guidelineChecks).every(
    (check) => check
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] bg-card rounded-lg shadow-elevation-4 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
            Review Content
          </h2>
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-smooth focus-ring"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="aspect-[16/9] rounded-lg overflow-hidden bg-muted">
                <AppImage
                  src={content.thumbnail}
                  alt={content.thumbnailAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-2">
                  {content.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {content.description}
                </p>
              </div>

              {content.content && (
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-foreground whitespace-pre-wrap">
                    {content.content}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {content.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <AppImage
                      src={content.submittedBy.avatar}
                      alt={content.submittedBy.avatarAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {content.submittedBy.name}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground caption">
                      <span className="flex items-center gap-1">
                        <Icon name="Star" size={12} className="text-accent" />
                        {content.submittedBy.rating.toFixed(1)}
                      </span>
                      <span>•</span>
                      <span>{content.submittedBy.totalSubmissions} posts</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-lg md:text-xl font-heading font-bold text-foreground whitespace-nowrap">
                      {content.viewCount.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground caption">Views</p>
                  </div>
                  <div>
                    <p className="text-lg md:text-xl font-heading font-bold text-foreground whitespace-nowrap">
                      {content.likeCount.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground caption">Likes</p>
                  </div>
                  <div>
                    <p className="text-lg md:text-xl font-heading font-bold text-foreground whitespace-nowrap">
                      {content.flagCount}
                    </p>
                    <p className="text-xs text-muted-foreground caption">Flags</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border">
                <h4 className="text-sm font-heading font-semibold text-foreground mb-3">
                  Community Guidelines Checklist
                </h4>
                <div className="space-y-2">
                  <Checkbox
                    label="Content is appropriate and respectful"
                    checked={guidelineChecks.appropriate}
                    onChange={(e) =>
                      setGuidelineChecks({
                        ...guidelineChecks,
                        appropriate: e.target.checked,
                      })
                    }
                  />
                  <Checkbox
                    label="Information is accurate and verified"
                    checked={guidelineChecks.accurate}
                    onChange={(e) =>
                      setGuidelineChecks({
                        ...guidelineChecks,
                        accurate: e.target.checked,
                      })
                    }
                  />
                  <Checkbox
                    label="Quality meets platform standards"
                    checked={guidelineChecks.quality}
                    onChange={(e) =>
                      setGuidelineChecks({
                        ...guidelineChecks,
                        quality: e.target.checked,
                      })
                    }
                  />
                  <Checkbox
                    label="Content is original or properly attributed"
                    checked={guidelineChecks.original}
                    onChange={(e) =>
                      setGuidelineChecks({
                        ...guidelineChecks,
                        original: e.target.checked,
                      })
                    }
                  />
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border">
                <h4 className="text-sm font-heading font-semibold text-foreground mb-3">
                  Violation Types (if rejecting)
                </h4>
                <div className="space-y-2">
                  {(['spam', 'inappropriate', 'copyright', 'misleading', 'other'] as ViolationType[]).map(
                    (violation) => (
                      <Checkbox
                        key={violation}
                        label={violation.charAt(0).toUpperCase() + violation.slice(1)}
                        checked={selectedViolations.includes(violation)}
                        onChange={() => handleViolationToggle(violation)}
                      />
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Moderation Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about your decision..."
                  rows={4}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-4 md:p-6 border-t border-border">
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            iconName="X"
            iconPosition="left"
            onClick={handleReject}
            disabled={selectedViolations.length === 0 && !notes}
          >
            Reject
          </Button>
          <Button
            variant="success"
            iconName="Check"
            iconPosition="left"
            onClick={handleApprove}
            disabled={!allGuidelinesChecked}
          >
            Approve
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModerationModal;