import React from 'react';
import Icon from 'components/ui/AppIcon';
import Image from 'components/ui/AppImage';
import Button from '../../../components/ui/Button';
import { ContentItem, ModerationAction } from '../types';

interface ContentCardProps {
  content: ContentItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onAction: (id: string, action: ModerationAction) => void;
  onViewDetails: (content: ContentItem) => void;
}

const ContentCard = ({
  content,
  isSelected,
  onSelect,
  onAction,
  onViewDetails,
}: ContentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-success/10 text-success';
      case 'rejected':
        return 'bg-error/10 text-error';
      case 'flagged':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-accent/10 text-accent';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'story':
        return 'FileText';
      case 'photo':
        return 'Image';
      case 'video':
        return 'Video';
      case 'review':
        return 'Star';
      default:
        return 'File';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-GB');
  };

  return (
    <div className="w-full min-w-0 bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 transition-smooth">
      <div className="relative">
        <div className="aspect-[16/9] overflow-hidden bg-muted">
          <Image
            src={content.thumbnail}
            alt={content.thumbnailAlt}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${getStatusColor(
              content.status
            )}`}
          >
            <Icon name={getTypeIcon(content.type)} size={12} />
            {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(content.id)}
            className="w-5 h-5 rounded border-2 border-white bg-white/90 cursor-pointer"
            aria-label={`Select ${content.title}`}
          />
        </div>

        {content.flagCount > 0 && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-error/90 text-error-foreground rounded-md text-xs font-medium">
            <Icon name="Flag" size={12} />
            {content.flagCount}
          </div>
        )}
      </div>

      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base md:text-lg font-heading font-semibold text-foreground line-clamp-2">
            {content.title}
          </h3>
          <span
            className={`flex-shrink-0 px-2 py-1 rounded text-xs font-medium ${getStatusColor(
              content.status
            )}`}
          >
            {content.status.charAt(0).toUpperCase() + content.status.slice(1)}
          </span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {content.description}
        </p>

        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
          <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden bg-muted">
            <Image
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
          <span className="text-xs text-muted-foreground caption whitespace-nowrap">
            {formatDate(content.submittedAt)}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground caption">
          <span className="flex items-center gap-1.5">
            <Icon name="Eye" size={14} />
            {content.viewCount.toLocaleString()}
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="Heart" size={14} />
            {content.likeCount.toLocaleString()}
          </span>
          {content.location && (
            <span className="flex items-center gap-1.5">
              <Icon name="MapPin" size={14} />
              {content.location}
            </span>
          )}
        </div>

        {content.status === 'pending' && (
          <div className="flex items-center gap-2">
            <Button
              variant="success"
              size="sm"
              iconName="Check"
              iconPosition="left"
              onClick={() => onAction(content.id, 'approve')}
              className="flex-1"
            >
              Approve
            </Button>
            <Button
              variant="destructive"
              size="sm"
              iconName="X"
              iconPosition="left"
              onClick={() => onAction(content.id, 'reject')}
              className="flex-1"
            >
              Reject
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Eye"
              onClick={() => onViewDetails(content)}
            >
              <span className="sr-only">View details</span>
            </Button>
          </div>
        )}

        {content.status !== 'pending' && (
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            onClick={() => onViewDetails(content)}
            fullWidth
          >
            View Details
          </Button>
        )}
      </div>
    </div>
  );
};

export default ContentCard;