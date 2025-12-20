import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/AppIcon';
import Image from '../../../components/ui/AppImage';
import Button from '../../../components/ui/Button';
import { Trek } from '../types';

interface FeaturedTreksProps {
  treks: Trek[];
}

const FeaturedTreks = ({ treks }: FeaturedTreksProps) => {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty: Trek['difficulty']) => {
    const colors = {
      Easy: 'bg-success text-success-foreground',
      Moderate: 'bg-warning text-warning-foreground',
      Hard: 'bg-[#F97316] text-white',
      Expert: 'bg-error text-error-foreground'
    };
    return colors[difficulty];
  };

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Featured Treks
            </h2>
            <p className="text-muted-foreground">
              Discover our most popular and highly-rated trekking routes
            </p>
          </div>
          <Button
            variant="outline"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={() => navigate('/trek-listing')}
            className="hidden md:flex"
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treks.map((trek) => (
            <div
              key={trek.id}
              onClick={() => navigate('/trek-detail')}
              className="group bg-card rounded-lg overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={trek.image}
                  alt={trek.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(trek.difficulty)}`}>
                    {trek.difficulty}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Icon name="Star" size={14} className="text-warning fill-warning" />
                  <span className="text-sm font-semibold text-foreground">{trek.rating}</span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                  {trek.name}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <Icon name="MapPin" size={16} />
                  <span className="text-sm">{trek.location}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={16} className="text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm font-semibold text-foreground">{trek.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Mountain" size={16} className="text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Max Altitude</p>
                      <p className="text-sm font-semibold text-foreground">{trek.maxAltitude}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Starting from</p>
                    <p className="text-lg font-bold text-primary">{trek.price}</p>
                  </div>
                  <Button variant="default" size="sm" iconName="ArrowRight" iconPosition="right">
                    Details
                  </Button>
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
            onClick={() => navigate('/trek-listing')}
            fullWidth
          >
            View All Treks
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTreks;