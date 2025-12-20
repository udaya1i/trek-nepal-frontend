import { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { SavedTrek } from '../types';

interface SavedTreksListProps {
  treks: SavedTrek[];
  onRemove?: (trekId: string) => void;
}

const SavedTreksList = ({ treks, onRemove }: SavedTreksListProps) => {
  const [selectedCollection, setSelectedCollection] = useState<string>('all');

  const collections = ['all', ...Array.from(new Set(treks.map(t => t.collection).filter(Boolean)))];

  const filteredTreks = selectedCollection === 'all'
    ? treks
    : treks.filter(t => t.collection === selectedCollection);

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
        <h2 className="text-xl font-heading font-bold text-foreground">Saved Treks</h2>
        <span className="text-sm text-muted-foreground">{treks.length} saved</span>
      </div>

      {collections.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {collections.map((collection:any) => (
            <button
              key={collection}
              onClick={() => setSelectedCollection(collection)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                selectedCollection === collection
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {collection === 'all' ? 'All Treks' : collection}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTreks.map((trek) => (
          <div
            key={trek.id}
            className="group bg-background rounded-lg border border-border overflow-hidden hover:shadow-md transition-all duration-200"
          >
            <div className="relative h-48 overflow-hidden">
              <Link to={`/trek-detail?id=${trek.trekId}`}>
                <Image
                  src={trek.trekImage}
                  alt={trek.trekImageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${difficultyColors[trek.difficulty]}`}>
                  {difficultyLabels[trek.difficulty]}
                </span>
              </div>
              <button
                onClick={() => onRemove?.(trek.trekId)}
                className="absolute top-3 right-3 w-8 h-8 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-error hover:text-error-foreground transition-colors duration-200"
                aria-label="Remove from saved"
              >
                <Icon name="Bookmark" size={16} className="fill-current" />
              </button>
            </div>
            <div className="p-4">
              <Link to={`/trek-detail?id=${trek.trekId}`}>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                  {trek.trekName}
                </h3>
              </Link>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="Calendar" size={14} />
                  <span>{trek.duration} days</span>
                </div>
                <span className="text-xs">
                  Saved {trek.savedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTreks.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Bookmark" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">No saved treks in this collection</p>
          <Link to="/trek-listing">
            <Button variant="default">Discover Treks</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SavedTreksList;