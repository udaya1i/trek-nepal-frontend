import { Link } from 'react-router-dom';
import Image from '../../../components/ui/AppImage';
import Icon from '../../../components/ui/AppIcon';
import { UserStory } from '../types';

interface StoriesGridProps {
  stories: UserStory[];
}

const StoriesGrid = ({ stories }: StoriesGridProps) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-foreground">Shared Stories</h2>
        <Link to="/story-feed-community" className="text-sm text-primary hover:underline">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stories.map((story) => (
          <div
            key={story.id}
            className="group bg-background rounded-lg border border-border overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={story.coverImage}
                alt={story.coverImageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="font-semibold text-background mb-1 line-clamp-2">
                  {story.title}
                </h3>
                <p className="text-xs text-background/80">{story.trekName}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Icon name="Heart" size={14} />
                    <span>{story.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="MessageCircle" size={14} />
                    <span>{story.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Eye" size={14} />
                    <span>{story.views}</span>
                  </div>
                </div>
                <span className="text-xs">
                  {story.publishedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesGrid;