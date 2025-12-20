import React from 'react';
import AppImage from 'components/ui/AppImage';
import Icon from 'components/ui/AppIcon';

interface AuthorCardProps {
  author: {
    name: string;
    avatar: string;
    avatarAlt: string;
    bio: string;
    followers: number;
  };
  publishDate: string;
  readTime: string;
}

const AuthorCard = ({ author, publishDate, readTime }: AuthorCardProps) => {
  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-border">
          <AppImage
            src={author.avatar}
            alt={author.avatarAlt}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-foreground mb-1">{author.name}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{author.bio}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Icon name="UserGroupIcon" size={16} />
              {author.followers.toLocaleString()} followers
            </span>
            <span className="flex items-center gap-1">
              <Icon name="CalendarIcon" size={16} />
              {publishDate}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="ClockIcon" size={16} />
              {readTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;