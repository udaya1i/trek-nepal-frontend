import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/AppIcon';
import Image from '../../../components/ui/AppImage';
import Button from '../../../components/ui/Button';
import { CommunityStory } from '../types';

interface CommunityStoriesProps {
  stories: CommunityStory[];
}

const CommunityStories = ({ stories }: CommunityStoriesProps) => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Community Stories
            </h2>
            <p className="text-muted-foreground">
              Real experiences from fellow trekkers
            </p>
          </div>
          <Button
            variant="outline"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={() => navigate('/story-feed-community')}
            className="hidden md:flex"
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              onClick={() => navigate('/story-feed-community')}
              className="group bg-card rounded-lg overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src={story.authorAvatar}
                    alt={story.authorAvatarAlt}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{story.author}</p>
                    <p className="text-xs text-muted-foreground">{story.timeAgo}</p>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                  {story.trekName}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {story.excerpt}
                </p>

                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icon name="Heart" size={16} />
                    <span className="text-sm">{story.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="MessageCircle" size={16} />
                    <span className="text-sm">{story.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 md:hidden">
          <Button
            variant="outline"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={() => navigate('/story-feed-community')}
            fullWidth
          >
            View All Stories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommunityStories;