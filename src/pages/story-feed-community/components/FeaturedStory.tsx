import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import type { Story } from '../types';

interface FeaturedStoryProps {
  story: Story;
}

const FeaturedStory = ({ story }: FeaturedStoryProps) => {
  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Easy: 'bg-success/10 text-success',
      Moderate: 'bg-warning/10 text-warning',
      Hard: 'bg-[#F97316]/10 text-[#F97316]',
      Expert: 'bg-error/10 text-error'
    };
    return colors[difficulty as keyof typeof colors] || colors.Easy;
  };

  return (
    <Link
      to={`/story-detail/${story.id}`}
      className="group block bg-card rounded-lg overflow-hidden border border-border hover:shadow-elevated transition-all duration-300"
    >
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative overflow-hidden aspect-[16/10] md:aspect-auto">
          <Image
            src={story.coverImage}
            alt={story.coverImageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 rounded-md text-xs font-semibold bg-primary text-primary-foreground flex items-center gap-1">
              <Icon name="Star" size={14} className="fill-current" />
              Featured Story
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(story.trek.difficulty)}`}>
              {story.trek.difficulty}
            </span>
            <span className="px-2 py-1 rounded-md text-xs font-medium bg-muted text-foreground">
              {story.contentType}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
            {story.title}
          </h2>

          <p className="text-muted-foreground mb-4 line-clamp-3">{story.excerpt}</p>

          <div className="flex items-center gap-3 mb-4">
            <Image
              src={story.author.avatar}
              alt={story.author.avatarAlt}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-foreground">{story.author.name}</span>
                {story.author.isVerified && (
                  <Icon name="BadgeCheck" size={14} className="text-primary" />
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{story.publishedAt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Icon name="MapPin" size={12} />
                  {story.trek.name}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-4 border-t border-border">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Icon name="Heart" size={18} />
              <span>{story.likesCount}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Icon name="MessageCircle" size={18} />
              <span>{story.commentsCount}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Icon name="Share2" size={18} />
              <span>{story.sharesCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedStory;