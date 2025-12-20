'use client';

import React, { useState, useEffect } from 'react';
import Icon from 'components/ui/AppIcon';

interface SocialActionsProps {
  initialLikes: number;
  initialComments: number;
  initialShares: number;
}

const SocialActions = ({ initialLikes, initialComments, initialShares }: SocialActionsProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleLike = () => {
    if (!isHydrated) return;
    
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const handleBookmark = () => {
    if (!isHydrated) return;
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (!isHydrated) return;
    
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'Nepal Trek Explorer Story',
        text: 'Check out this amazing trekking story!',
        url: typeof window !== 'undefined' ? window.location.href : '',
      }).catch(() => {});
    }
  };

  return (
    <div className="flex items-center gap-4 py-4 border-y border-border">
      <button
        onClick={handleLike}
        disabled={!isHydrated}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-smooth ${
          isLiked
            ? 'bg-accent/10 text-accent' :'bg-muted hover:bg-muted/80 text-foreground'
        }`}
      >
        <Icon name="HeartIcon" size={20} variant={isLiked ? 'solid' : 'outline'} />
        <span className="font-medium">{likes.toLocaleString()}</span>
      </button>

      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-smooth text-foreground">
        <Icon name="ChatBubbleLeftIcon" size={20} />
        <span className="font-medium">{initialComments.toLocaleString()}</span>
      </button>

      <button
        onClick={handleShare}
        disabled={!isHydrated}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-smooth text-foreground"
      >
        <Icon name="ShareIcon" size={20} />
        <span className="font-medium">{initialShares.toLocaleString()}</span>
      </button>

      <button
        onClick={handleBookmark}
        disabled={!isHydrated}
        className={`ml-auto p-2 rounded-lg transition-smooth ${
          isBookmarked
            ? 'bg-primary/10 text-primary' :'bg-muted hover:bg-muted/80 text-foreground'
        }`}
        aria-label="Bookmark story"
      >
        <Icon name="BookmarkIcon" size={20} variant={isBookmarked ? 'solid' : 'outline'} />
      </button>
    </div>
  );
};

export default SocialActions;