import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/AppIcon';
import Image from '../../../components/ui/AppImage';
import { TrekCategory } from '../types';

interface TrekCategoriesProps {
  categories: TrekCategory[];
}

const TrekCategories = ({ categories }: TrekCategoriesProps) => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Explore by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose your adventure based on your preferences and experience level
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => navigate(`/trek-listing?category=${category.name}`)}
              className="group relative h-64 rounded-lg overflow-hidden cursor-pointer shadow-card hover:shadow-elevated transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
              <Image
                src={category.image}
                alt={category.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-4 group-hover:bg-white/20 transition-colors duration-300">
                  <Icon name={category.icon} size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-white/80 text-sm">
                  {category.trekCount} Treks Available
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrekCategories;