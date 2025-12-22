import React from 'react';
 import AppImage from 'components/ui/AppImage';
import Icon from 'components/ui/AppIcon';
import { Link } from 'react-router-dom';

interface AuthorStory {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  publishDate: string;
  readTime: string;
}

interface AuthorOtherStoriesProps {
  authorName: string;
  stories: AuthorStory[];
}

const AuthorOtherStories = ({ authorName, stories }: AuthorOtherStoriesProps) => {
  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="font-heading font-semibold text-xl text-foreground mb-6">
        More from {authorName}
      </h3>
      <div className="space-y-4">
        {stories.map((story) => (
          <Link
            key={story.id}
            to="/story-detail"
            className="flex gap-4 group hover:bg-muted rounded-lg p-3 -m-3 transition-smooth"
          >
            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <AppImage
                src={story.image}
                alt={story.imageAlt}
                width={96}
                height={96}
                className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-smooth">
                {story.title}
              </h4>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="CalendarIcon" size={14} />
                  {story.publishDate}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="ClockIcon" size={14} />
                  {story.readTime}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link
        to="/story-feed"
        className="block mt-4 text-center py-2 text-primary hover:underline transition-smooth font-medium"
      >
        View all stories by {authorName}
      </Link>
    </div>
  );
};

export default AuthorOtherStories;