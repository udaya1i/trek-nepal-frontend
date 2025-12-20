import Icon from '../../../components/AppIcon';
import { Badge } from '../types';

interface BadgeGridProps {
  badges: Badge[];
}

const BadgeGrid = ({ badges }: BadgeGridProps) => {
  const categoryColors = {
    difficulty: 'from-error/20 to-error/5',
    region: 'from-primary/20 to-primary/5',
    achievement: 'from-accent/20 to-accent/5',
    community: 'from-secondary/20 to-secondary/5'
  };

  const categoryLabels = {
    difficulty: 'Difficulty',
    region: 'Region',
    achievement: 'Achievement',
    community: 'Community'
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-foreground">Achievement Badges</h2>
        <span className="text-sm text-muted-foreground">{badges.length} earned</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`relative bg-gradient-to-br ${categoryColors[badge.category]} rounded-lg p-4 border border-border hover:shadow-md transition-all duration-200 cursor-pointer group`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
                <Icon name={badge.icon} size={32} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{badge.name}</h3>
              <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
              <span className="text-xs text-muted-foreground">
                {badge.earnedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            </div>
            {badge.progress !== undefined && badge.maxProgress !== undefined && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>{badge.progress}/{badge.maxProgress}</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                  />
                </div>
              </div>
            )}
            <div className="absolute top-2 right-2">
              <span className="text-xs px-2 py-0.5 bg-background/80 backdrop-blur-sm rounded-md text-muted-foreground">
                {categoryLabels[badge.category]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgeGrid;