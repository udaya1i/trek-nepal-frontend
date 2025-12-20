import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { Trek } from '../types';

interface TrekCardProps {
  trek: Trek;
  onBookmarkToggle: (trekId: string) => void;
}

const TrekCard = ({ trek, onBookmarkToggle }: TrekCardProps) => {
  const difficultyColors = {
    Easy: 'bg-success text-success-foreground',
    Moderate: 'bg-warning text-warning-foreground',
    Hard: 'bg-[#F97316] text-white',
    Expert: 'bg-error text-error-foreground',
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-all duration-300 group">
      <Link to={`/trek-detail?id=${trek.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={trek.image}
            alt={trek.alt}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                difficultyColors[trek.difficulty]
              }`}
            >
              {trek.difficulty}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              onBookmarkToggle(trek.id);
            }}
            className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
            aria-label={trek.isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            <Icon
              name={trek.isBookmarked ? 'Bookmark' : 'BookmarkPlus'}
              size={18}
              className={trek.isBookmarked ? 'text-primary' : 'text-foreground'}
            />
          </button>
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <Link to={`/trek-detail?id=${trek.id}`}>
          <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
            {trek.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="MapPin" size={16} />
          <span>{trek.location}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Calendar" size={16} />
            <span>{trek.duration} days</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Mountain" size={16} />
            <span>{trek.maxAltitude.toLocaleString()}m</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={14}
                className={
                  i < Math.floor(trek.rating)
                    ? 'text-warning fill-warning' :'text-muted-foreground'
                }
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {trek.rating} ({trek.reviewCount})
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {trek.highlights.slice(0, 2).map((highlight, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
            >
              {highlight}
            </span>
          ))}
        </div>

        <div className="pt-3 border-t border-border flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground">From</span>
            <p className="text-lg font-semibold text-primary">
              ${trek.price.toLocaleString()}
            </p>
          </div>
          <Link to={`/trek-detail?id=${trek.id}`}>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrekCard;