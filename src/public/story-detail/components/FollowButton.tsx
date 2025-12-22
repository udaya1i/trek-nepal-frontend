'use client';

import React, { useState, useEffect } from 'react';
import Icon from 'components/ui/AppIcon';

interface FollowButtonProps {
  authorName: string;
}

const FollowButton = ({ authorName }: FollowButtonProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleFollow = () => {
    if (!isHydrated) return;
    setIsFollowing(!isFollowing);
  };

  return (
    <button
      onClick={handleFollow}
      disabled={!isHydrated}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-smooth ${
        isFollowing
          ? 'bg-muted text-foreground hover:bg-muted/80'
          : 'bg-primary text-primary-foreground hover:scale-[0.97]'
      }`}
    >
      <Icon name={isFollowing ? 'CheckIcon' : 'UserPlusIcon'} size={20} />
      <span>{isFollowing ? 'Following' : `Follow ${authorName}`}</span>
    </button>
  );
};

export default FollowButton;