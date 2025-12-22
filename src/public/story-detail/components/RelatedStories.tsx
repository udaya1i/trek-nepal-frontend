import React from 'react';
 import AppImage from 'components/ui/AppImage';
import Icon from 'components/ui/AppIcon';
import { Link } from 'react-router-dom';

interface RelatedStory {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  author: string;
  readTime: string;
  likes: number;
}

interface RelatedStoriesProps {
  stories: RelatedStory[];
}

const RelatedStories = ({ stories }: RelatedStoriesProps) => {
  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="font-heading font-semibold text-xl text-foreground mb-6">Related Stories</h3>
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
                  <Icon name="UserIcon" size={14} />
                  {story.author}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="ClockIcon" size={14} />
                  {story.readTime}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <Icon name="HeartIcon" size={14} />
                <span>{story.likes.toLocaleString()} likes</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedStories;