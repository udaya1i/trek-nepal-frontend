'use client';

import React, { useState, useEffect } from 'react';
import Icon from 'components/ui/AppIcon';

interface AutoSaveIndicatorProps {
  lastSaved: Date | null;
  isSaving: boolean;
}

const AutoSaveIndicator = ({ lastSaved, isSaving }: AutoSaveIndicatorProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || !lastSaved) return;

    const updateTimeAgo = () => {
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - lastSaved.getTime()) / 1000);

      if (diffInSeconds < 60) {
        setTimeAgo('just now');
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        setTimeAgo(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`);
      } else {
        const hours = Math.floor(diffInSeconds / 3600);
        setTimeAgo(`${hours} ${hours === 1 ? 'hour' : 'hours'} ago`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 30000);

    return () => clearInterval(interval);
  }, [lastSaved, isHydrated]);

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      {isSaving ? (
        <>
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-muted-foreground">Saving...</span>
        </>
      ) : lastSaved ? (
        <>
          <Icon name="CheckCircleIcon" size={16} className="text-success" />
          <span className="text-muted-foreground">Saved {timeAgo}</span>
        </>
      ) : (
        <>
          <Icon name="CloudIcon" size={16} className="text-muted-foreground" />
          <span className="text-muted-foreground">Not saved yet</span>
        </>
      )}
    </div>
  );
};

export default AutoSaveIndicator;