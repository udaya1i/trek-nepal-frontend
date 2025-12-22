import { Link } from 'react-router-dom';
import Image from '../../../components/ui/AppImage';
import Icon from '../../../components/ui/AppIcon';
import { CompletedTrek } from '../types';

interface CompletedTreksListProps {
  treks: CompletedTrek[];
}

const CompletedTreksList = ({ treks }: CompletedTreksListProps) => {
  const difficultyColors = {
    easy: 'bg-success/10 text-success',
    moderate: 'bg-warning/10 text-warning',
    hard: 'bg-accent/10 text-accent',
    expert: 'bg-error/10 text-error'
  };

  const difficultyLabels = {
    easy: 'Easy',
    moderate: 'Moderate',
    hard: 'Hard',
    expert: 'Expert'
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-foreground">Completed Treks</h2>
        <span className="text-sm text-muted-foreground">{treks.length} treks</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {treks.map((trek) => (
          <Link
            key={trek.id}
            to={`/trek-detail?id=${trek.trekId}`}
            className="group bg-background rounded-lg border border-border overflow-hidden hover:shadow-md transition-all duration-200"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={trek.trekImage}
                alt={trek.trekImageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${difficultyColors[trek.difficulty]}`}>
                  {difficultyLabels[trek.difficulty]}
                </span>
              </div>
              <div className="absolute top-3 right-3 flex gap-2">
                {trek.hasReview && (
                  <div className="w-8 h-8 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Icon name="Star" size={16} className="text-warning" />
                  </div>
                )}
                {trek.hasStory && (
                  <div className="w-8 h-8 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Icon name="BookOpen" size={16} className="text-primary" />
                  </div>
                )}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                {trek.trekName}
              </h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Icon name="Calendar" size={14} />
                    <span>{trek.duration} days</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={14} className="text-warning" />
                    <span>{trek.rating.toFixed(1)}</span>
                  </div>
                </div>
                <span className="text-xs">
                  {trek.completedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompletedTreksList;