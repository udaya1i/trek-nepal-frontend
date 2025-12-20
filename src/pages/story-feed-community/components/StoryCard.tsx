import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/ui/AppIcon';
import Image from '../../../components/ui/AppImage';

import type { StoryCardProps } from '../types';

const StoryCard = ({ story, onLike, onBookmark, onShare }: StoryCardProps) => {
  const [isLiked, setIsLiked] = useState(story.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(story.isBookmarked);
  const [likesCount, setLikesCount] = useState(story.likesCount);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    onLike(story.id);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
    onBookmark(story.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    onShare(story.id);
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Easy: 'bg-success/10 text-success',
      Moderate: 'bg-warning/10 text-warning',
      Hard: 'bg-[#F97316]/10 text-[#F97316]',
      Expert: 'bg-error/10 text-error'
    };
    return colors[difficulty as keyof typeof colors] || colors.Easy;
  };

  const getContentTypeIcon = (type: string) => {
    const icons = {
      'Trail Condition': 'Mountain',
      'Cultural Experience': 'Users',
      'Safety Update': 'AlertTriangle',
      'Travel Tips': 'Lightbulb',
      'Photo Story': 'Camera'
    };
    return icons[type as keyof typeof icons] || 'FileText';
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    }
  };

  return (
    <Link
      to={`/story-detail/${story.id}`}
      className="group block bg-card rounded-lg overflow-hidden border border-border hover:shadow-elevated transition-all duration-300"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <Image
          src={story.coverImage}
          alt={story.coverImageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(story.trek.difficulty)}`}>
            {story.trek.difficulty}
          </span>
          <span className="px-2 py-1 rounded-md text-xs font-medium bg-background/90 text-foreground backdrop-blur-sm flex items-center gap-1">
            <Icon name={getContentTypeIcon(story.contentType)} size={12} />
            {story.contentType}
          </span>
        </div>
        <button
          onClick={handleBookmark}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background transition-colors duration-200"
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <Icon
            name={isBookmarked ? 'Bookmark' : 'Bookmark'}
            size={18}
            className={isBookmarked ? 'fill-primary text-primary' : 'text-foreground'}
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Link
            to={`/user-profile/${story.author.id}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
          >
            <Image
              src={story.author.avatar}
              alt={story.author.avatarAlt}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-foreground">{story.author.name}</span>
              {story.author.isVerified && (
                <Icon name="BadgeCheck" size={14} className="text-primary" />
              )}
            </div>
          </Link>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{formatDate(story.publishedAt)}</span>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {story.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{story.excerpt}</p>

        <div className="flex items-center gap-2 mb-3">
          <Link
            to={`/trek-detail/${story.trek.id}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <Icon name="MapPin" size={12} />
            {story.trek.name}
          </Link>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              aria-label={isLiked ? 'Unlike story' : 'Like story'}
            >
              <Icon
                name="Heart"
                size={18}
                className={isLiked ? 'fill-primary text-primary' : ''}
              />
              <span className={isLiked ? 'text-primary font-medium' : ''}>{likesCount}</span>
            </button>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Icon name="MessageCircle" size={18} />
              <span>{story.commentsCount}</span>
            </div>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label="Share story"
          >
            <Icon name="Share2" size={18} />
            <span>{story.sharesCount}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default StoryCard;