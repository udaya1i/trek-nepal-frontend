import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/AppIcon';

import Button from '../../../components/ui/Button';
import { SearchSuggestion } from '../types';

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchSuggestions: SearchSuggestion[] = [
  { id: '1', type: 'trek', name: 'Everest Base Camp Trek', category: 'Popular' },
  { id: '2', type: 'trek', name: 'Annapurna Circuit Trek', category: 'Popular' },
  { id: '3', type: 'trek', name: 'Langtang Valley Trek', category: 'Moderate' },
  { id: '4', type: 'location', name: 'Kathmandu', category: 'City' },
  { id: '5', type: 'location', name: 'Pokhara', category: 'City' },
  { id: '6', type: 'service', name: 'Trekking Guides', category: 'Service' },
  { id: '7', type: 'trek', name: 'Manaslu Circuit Trek', category: 'Expert' },
  { id: '8', type: 'trek', name: 'Upper Mustang Trek', category: 'Hard' }];


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim().length > 0) {
      const filtered = searchSuggestions.filter((suggestion) =>
      suggestion.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
    navigate(`/trek-listing?search=${encodeURIComponent(suggestion.name)}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      navigate(`/trek-listing?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
      <img
        src="https://images.unsplash.com/photo-1711258478476-501151c7de50"
        alt="Majestic snow-capped Himalayan mountain peaks with dramatic clouds at sunrise"
        className="absolute inset-0 w-full h-full object-cover" />


      <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Discover Your Next Adventure
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 drop-shadow-md">
          Explore Nepal's most breathtaking treks with trusted guides and authentic local experiences
        </p>

        <div ref={searchRef} className="relative max-w-2xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="flex items-center gap-2 bg-white rounded-lg shadow-elevated p-2">
              <Icon name="Search" size={24} className="text-muted-foreground ml-2" />
              <input
                type="text"
                placeholder="Search treks, locations, or services..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="flex-1 px-2 py-3 text-base outline-none border-none" />

              <Button type="submit" variant="default" size="lg" className="px-6">
                Search
              </Button>
            </div>
          </form>

          {showSuggestions && filteredSuggestions.length > 0 &&
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-elevated max-h-80 overflow-y-auto z-50">
              {filteredSuggestions.map((suggestion) =>
            <button
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors duration-200 text-left border-b border-border last:border-0">

                  <Icon
                name={suggestion.type === 'trek' ? 'Mountain' : suggestion.type === 'location' ? 'MapPin' : 'Users'}
                size={20}
                className="text-primary" />

                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{suggestion.name}</p>
                    {suggestion.category &&
                <p className="text-xs text-muted-foreground">{suggestion.category}</p>
                }
                  </div>
                </button>
            )}
            </div>
          }
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Button
            variant="default"
            size="lg"
            iconName="Mountain"
            iconPosition="left"
            onClick={() => navigate('/trek-listing')}>

            Explore Treks
          </Button>
          <Button
            variant="outline"
            size="lg"
            iconName="Users"
            iconPosition="left"
            onClick={() => navigate('/story-feed-community')}
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">

            Join Community
          </Button>
        </div>
      </div>
    </section>);

};

export default HeroSection;