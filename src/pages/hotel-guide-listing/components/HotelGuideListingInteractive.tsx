'use client';

import React, { useState, useEffect } from 'react';
 import SortControls from './SortControls';
import ProviderGrid from './ProviderGrid';
import MapView from './MapView';
import { Provider } from './ProviderCard';
import Icon from 'components/ui/AppIcon';
import FilterPanel from './FilterPanel';

interface FilterOptions {
  location: string;
  serviceType: 'all' | 'hotels' | 'guides';
  priceRange: [number, number];
  amenities: string[];
  verifiedOnly: boolean;
}

type SortOption = 'rating' | 'price-low' | 'price-high' | 'distance' | 'newest';

const HotelGuideListingInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    location: 'All Locations',
    serviceType: 'all',
    priceRange: [0, 200],
    amenities: [],
    verifiedOnly: false
  });
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'Himalayan Lodge & Restaurant',
    type: 'hotel',
    location: 'Namche Bazaar',
    priceRange: '$45-80',
    rating: 4.8,
    reviewCount: 156,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dd060f5a-1765372776633.png",
    alt: 'Traditional Himalayan lodge with stone walls and wooden balconies overlooking mountain valley',
    verified: true,
    amenities: ['WiFi', 'Hot Shower', 'Restaurant', 'Mountain View'],
    whatsapp: '9779841234567',
    viber: '9779841234567'
  },
  {
    id: '2',
    name: 'Tenzing Sherpa - Expert Guide',
    type: 'guide',
    location: 'Lukla',
    priceRange: '$60-100',
    rating: 4.9,
    reviewCount: 203,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bdbfaaf7-1764692977658.png",
    alt: 'Experienced Sherpa guide in traditional clothing standing on mountain trail with trekking poles',
    verified: true,
    amenities: ['15+ Years Experience', 'English Speaking', 'First Aid Certified', 'Licensed'],
    whatsapp: '9779851234567',
    viber: '9779851234567'
  },
  {
    id: '3',
    name: 'Everest View Hotel',
    type: 'hotel',
    location: 'Syangboche',
    priceRange: '$120-180',
    rating: 4.7,
    reviewCount: 89,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_178756b78-1765212365826.png",
    alt: 'Luxury mountain hotel with panoramic windows showcasing snow-capped Everest peaks',
    verified: true,
    amenities: ['WiFi', 'Heating', 'Restaurant', 'Power Backup', 'Mountain View'],
    whatsapp: '9779861234567'
  },
  {
    id: '4',
    name: 'Lakeside Retreat Pokhara',
    type: 'hotel',
    location: 'Pokhara',
    priceRange: '$35-65',
    rating: 4.6,
    reviewCount: 234,
    image: "https://images.unsplash.com/photo-1701401876446-2a012116e6df",
    alt: 'Peaceful lakeside hotel with traditional Nepali architecture reflected in calm water',
    verified: true,
    amenities: ['WiFi', 'Hot Shower', 'Laundry', 'Parking', 'Restaurant'],
    whatsapp: '9779871234567',
    viber: '9779871234567'
  },
  {
    id: '5',
    name: 'Pasang Lama - Mountain Guide',
    type: 'guide',
    location: 'Kathmandu',
    priceRange: '$50-90',
    rating: 4.8,
    reviewCount: 167,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14de42ad9-1764692981494.png",
    alt: 'Professional mountain guide with climbing gear and backpack on rocky mountain terrain',
    verified: true,
    amenities: ['10+ Years Experience', 'Multiple Languages', 'Wilderness First Responder', 'Licensed'],
    whatsapp: '9779881234567'
  },
  {
    id: '6',
    name: 'Annapurna Guest House',
    type: 'hotel',
    location: 'Ghandruk',
    priceRange: '$25-45',
    rating: 4.5,
    reviewCount: 178,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_175c32ce9-1765101485598.png",
    alt: 'Cozy mountain guest house with flower gardens and traditional stone architecture',
    verified: false,
    amenities: ['Hot Shower', 'Restaurant', 'Mountain View', 'WiFi'],
    whatsapp: '9779891234567',
    viber: '9779891234567'
  },
  {
    id: '7',
    name: 'Dawa Sherpa - Trekking Guide',
    type: 'guide',
    location: 'Namche Bazaar',
    priceRange: '$55-95',
    rating: 4.9,
    reviewCount: 145,
    image: "https://images.unsplash.com/photo-1548789997-82da68437ad8",
    alt: 'Smiling Sherpa guide in red jacket with ice axe on snowy mountain slope',
    verified: true,
    amenities: ['12+ Years Experience', 'English & German', 'High Altitude Expert', 'Licensed'],
    whatsapp: '9779801234567',
    viber: '9779801234567'
  },
  {
    id: '8',
    name: 'Mountain View Lodge Jomsom',
    type: 'hotel',
    location: 'Jomsom',
    priceRange: '$40-70',
    rating: 4.7,
    reviewCount: 112,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ab5aaeb8-1764852814380.png",
    alt: 'Modern lodge with large windows overlooking dramatic mountain landscape and valley',
    verified: true,
    amenities: ['WiFi', 'Heating', 'Hot Shower', 'Restaurant', 'Power Backup'],
    whatsapp: '9779811234567'
  },
  {
    id: '9',
    name: 'Manang Heritage Hotel',
    type: 'hotel',
    location: 'Manang',
    priceRange: '$50-85',
    rating: 4.6,
    reviewCount: 98,
    image: "https://images.unsplash.com/photo-1703222422362-d1699bf78964",
    alt: 'Traditional heritage hotel with carved wooden details and colorful prayer flags',
    verified: true,
    amenities: ['WiFi', 'Hot Shower', 'Restaurant', 'Heating', 'Mountain View'],
    whatsapp: '9779821234567',
    viber: '9779821234567'
  }];


  const filterProviders = (providers: Provider[]): Provider[] => {
    return providers.filter((provider) => {
      // Location filter
      if (filters.location !== 'All Locations' && provider.location !== filters.location) {
        return false;
      }

      // Service type filter
      if (filters.serviceType !== 'all' && provider.type !== filters.serviceType.slice(0, -1)) {
        return false;
      }

      // Price range filter
      const priceValue = parseInt(provider.priceRange.split('-')[0].replace('$', ''));
      if (priceValue < filters.priceRange[0] || priceValue > filters.priceRange[1]) {
        return false;
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every((amenity) =>
        provider.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      // Verified filter
      if (filters.verifiedOnly && !provider.verified) {
        return false;
      }

      return true;
    });
  };

  const sortProviders = (providers: Provider[]): Provider[] => {
    const sorted = [...providers];
    switch (sortBy) {
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'price-low':
        return sorted.sort((a, b) => {
          const priceA = parseInt(a.priceRange.split('-')[0].replace('$', ''));
          const priceB = parseInt(b.priceRange.split('-')[0].replace('$', ''));
          return priceA - priceB;
        });
      case 'price-high':
        return sorted.sort((a, b) => {
          const priceA = parseInt(a.priceRange.split('-')[0].replace('$', ''));
          const priceB = parseInt(b.priceRange.split('-')[0].replace('$', ''));
          return priceB - priceA;
        });
      case 'newest':
        return sorted.reverse();
      default:
        return sorted;
    }
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setIsLoading(true);
    setFilters(newFilters);
    setTimeout(() => setIsLoading(false), 500);
  };

  const filteredProviders = sortProviders(filterProviders(mockProviders));

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-4 lg:mx-16 py-8">
          <div className="h-8 bg-muted rounded w-48 mb-6 animate-pulse" />
          <div className="flex gap-6">
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="h-96 bg-muted rounded-xl animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="h-12 bg-muted rounded-xl mb-6 animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) =>
                <div key={i} className="h-96 bg-muted rounded-xl animate-pulse" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-4 lg:mx-16 py-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="w-full h-12 px-4 bg-primary text-primary-foreground rounded-xl font-medium flex items-center justify-center gap-2 hover:scale-[0.97] transition-smooth">

            <Icon name="AdjustmentsHorizontalIcon" size={20} />
            Filters ({filteredProviders.length} results)
          </button>
        </div>

        {/* Main Layout */}
        <div className="flex gap-6">
          {/* Filter Panel */}
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            resultCount={filteredProviders.length}
            isMobileOpen={isMobileFilterOpen}
            onMobileClose={() => setIsMobileFilterOpen(false)} />


          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Sort Controls */}
            <SortControls
              currentSort={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode} />


            {/* Content Display */}
            {viewMode === 'grid' ?
            <ProviderGrid providers={filteredProviders} isLoading={isLoading} /> :

            <MapView providers={filteredProviders} />
            }

            {/* Load More Button */}
            {viewMode === 'grid' && filteredProviders.length > 0 && !isLoading &&
            <div className="mt-8 text-center">
                <button className="h-12 px-8 bg-muted text-foreground rounded-xl font-medium hover:bg-muted/80 transition-smooth">
                  Load More Providers
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

};

export default HotelGuideListingInteractive;