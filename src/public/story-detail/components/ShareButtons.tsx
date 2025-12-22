'use client';

import React, { useState, useEffect } from 'react';
import Icon from 'components/ui/AppIcon';
interface ShareButtonsProps {
  title: string;
  hashtags: string[];
}

const ShareButtons = ({ title, hashtags }: ShareButtonsProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const shareUrl = isHydrated && typeof window !== 'undefined' ? window.location.href : '';
  const hashtagString = hashtags.join(' ');

  const handleCopyLink = async () => {
    if (!isHydrated) return;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareButtons = [
    {
      name: 'Facebook',
      icon: 'ShareIcon',
      color: 'bg-[#1877F2] hover:bg-[#1877F2]/90',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Twitter',
      icon: 'ShareIcon',
      color: 'bg-[#1DA1F2] hover:bg-[#1DA1F2]/90',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}&hashtags=${encodeURIComponent(hashtagString)}`,
    },
    {
      name: 'LinkedIn',
      icon: 'ShareIcon',
      color: 'bg-[#0A66C2] hover:bg-[#0A66C2]/90',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'WhatsApp',
      icon: 'ChatBubbleLeftIcon',
      color: 'bg-[#25D366] hover:bg-[#25D366]/90',
      url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + shareUrl)}`,
    },
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Share this story</h3>
      <div className="grid grid-cols-2 gap-3">
        {shareButtons.map((button) => (
          <a
            key={button.name}
            href={button.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 px-4 py-3 ${button.color} text-white rounded-lg transition-smooth font-medium`}
          >
            <Icon name={button.icon as any} size={20} />
            <span>{button.name}</span>
          </a>
        ))}
      </div>
      <button
        onClick={handleCopyLink}
        disabled={!isHydrated}
        className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-smooth font-medium"
      >
        <Icon name={copied ? 'CheckIcon' : 'LinkIcon'} size={20} />
        <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
      </button>
    </div>
  );
};

export default ShareButtons;