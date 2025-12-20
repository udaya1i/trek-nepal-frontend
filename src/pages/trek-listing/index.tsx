import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { ActiveFilters, FilterOptions, SortOption, Trek, ViewMode } from './types';
import FilterSidebar from './components/FilterSidebar';
import TrekCard from './components/TrekCard';
import MapView from './components/MapView';

const TrekListing = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    location: '',
    difficulty: '',
    duration: [1, 30],
    altitude: [1000, 9000],
    season: '',
    budget: [500, 5000],
    searchQuery: ''
  });

  const mockTreks: Trek[] = [
  {
    id: '1',
    name: 'Everest Base Camp Trek',
    location: 'Solukhumbu',
    region: 'Everest',
    difficulty: 'Hard',
    duration: 14,
    maxAltitude: 5364,
    bestSeason: ['Spring', 'Autumn'],
    price: 1200,
    rating: 4.8,
    reviewCount: 342,
    image: "https://images.unsplash.com/photo-1668000774947-f6b9f7c21642",
    alt: 'Majestic view of Mount Everest with snow-covered peaks against clear blue sky',
    highlights: ['Everest View', 'Sherpa Culture', 'Khumbu Glacier'],
    isBookmarked: false,
    popularity: 95
  },
  {
    id: '2',
    name: 'Annapurna Circuit Trek',
    location: 'Manang',
    region: 'Annapurna',
    difficulty: 'Moderate',
    duration: 18,
    maxAltitude: 5416,
    bestSeason: ['Spring', 'Autumn'],
    price: 950,
    rating: 4.7,
    reviewCount: 289,
    image: "https://images.unsplash.com/photo-1695633114707-debba74af5ae",
    alt: 'Panoramic view of Annapurna mountain range with terraced fields in foreground',
    highlights: ['Thorong La Pass', 'Diverse Landscapes', 'Hot Springs'],
    isBookmarked: true,
    popularity: 92
  },
  {
    id: '3',
    name: 'Langtang Valley Trek',
    location: 'Rasuwa',
    region: 'Langtang',
    difficulty: 'Moderate',
    duration: 10,
    maxAltitude: 4984,
    bestSeason: ['Spring', 'Autumn', 'Winter'],
    price: 650,
    rating: 4.6,
    reviewCount: 178,
    image: "https://images.unsplash.com/photo-1540876508220-988a11575ed6",
    alt: 'Serene Langtang valley with traditional stone houses and prayer flags',
    highlights: ['Kyanjin Gompa', 'Cheese Factory', 'Glacier Views'],
    isBookmarked: false,
    popularity: 78
  },
  {
    id: '4',
    name: 'Manaslu Circuit Trek',
    location: 'Gorkha',
    region: 'Manaslu',
    difficulty: 'Hard',
    duration: 16,
    maxAltitude: 5160,
    bestSeason: ['Spring', 'Autumn'],
    price: 1100,
    rating: 4.9,
    reviewCount: 156,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1632c0bad-1765870898090.png",
    alt: 'Remote mountain trail with Manaslu peak towering in background',
    highlights: ['Larkya La Pass', 'Remote Villages', 'Buddhist Culture'],
    isBookmarked: false,
    popularity: 85
  },
  {
    id: '5',
    name: 'Gokyo Lakes Trek',
    location: 'Solukhumbu',
    region: 'Everest',
    difficulty: 'Moderate',
    duration: 12,
    maxAltitude: 5357,
    bestSeason: ['Spring', 'Autumn'],
    price: 980,
    rating: 4.7,
    reviewCount: 234,
    image: "https://images.unsplash.com/photo-1727527817599-0cbabc85f6fb",
    alt: 'Turquoise Gokyo lakes surrounded by snow-capped Himalayan peaks',
    highlights: ['Gokyo Ri', 'Turquoise Lakes', 'Ngozumpa Glacier'],
    isBookmarked: true,
    popularity: 88
  },
  {
    id: '6',
    name: 'Upper Mustang Trek',
    location: 'Mustang',
    region: 'Mustang',
    difficulty: 'Moderate',
    duration: 14,
    maxAltitude: 3840,
    bestSeason: ['Spring', 'Summer', 'Autumn'],
    price: 1450,
    rating: 4.8,
    reviewCount: 198,
    image: "https://images.unsplash.com/photo-1732697202830-f4be674fe731",
    alt: 'Ancient Buddhist monastery perched on cliff in arid Mustang landscape',
    highlights: ['Lo Manthang', 'Tibetan Culture', 'Ancient Caves'],
    isBookmarked: false,
    popularity: 82
  },
  {
    id: '7',
    name: 'Poon Hill Trek',
    location: 'Kaski',
    region: 'Annapurna',
    difficulty: 'Easy',
    duration: 5,
    maxAltitude: 3210,
    bestSeason: ['Spring', 'Autumn', 'Winter'],
    price: 380,
    rating: 4.5,
    reviewCount: 412,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_106b57b49-1765770469085.png",
    alt: 'Golden sunrise over Annapurna range viewed from Poon Hill viewpoint',
    highlights: ['Sunrise Views', 'Rhododendron Forest', 'Gurung Villages'],
    isBookmarked: false,
    popularity: 90
  },
  {
    id: '8',
    name: 'Kanchenjunga Base Camp Trek',
    location: 'Taplejung',
    region: 'Kanchenjunga',
    difficulty: 'Expert',
    duration: 20,
    maxAltitude: 5143,
    bestSeason: ['Spring', 'Autumn'],
    price: 1650,
    rating: 4.9,
    reviewCount: 89,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1632c0bad-1765870898090.png",
    alt: 'Pristine wilderness with Kanchenjunga mountain massif in distance',
    highlights: ['Third Highest Peak', 'Remote Wilderness', 'Diverse Flora'],
    isBookmarked: false,
    popularity: 72
  }];


  const filterOptions: FilterOptions = {
    locations: ['Solukhumbu', 'Manang', 'Rasuwa', 'Gorkha', 'Mustang', 'Kaski', 'Taplejung'],
    difficulties: ['Easy', 'Moderate', 'Hard', 'Expert'],
    durationRange: [1, 30],
    altitudeRange: [1000, 9000],
    seasons: ['Spring', 'Summer', 'Autumn', 'Winter'],
    budgetRange: [300, 2000]
  };

  const filteredAndSortedTreks = useMemo(() => {
    let filtered = mockTreks.filter((trek:any) => {
      const matchesLocation = !activeFilters.location || trek.location === activeFilters.location;
      const matchesDifficulty =
      !activeFilters.difficulty || trek.difficulty === activeFilters.difficulty;
      const matchesDuration =
      trek.duration >= activeFilters.duration[0] &&
      trek.duration <= activeFilters.duration[1];
      const matchesAltitude =
      trek.maxAltitude >= activeFilters.altitude[0] &&
      trek.maxAltitude <= activeFilters.altitude[1];
      const matchesSeason =
      !activeFilters.season || trek.bestSeason.includes(activeFilters.season);
      const matchesBudget =
      trek.price >= activeFilters.budget[0] && trek.price <= activeFilters.budget[1];
      const matchesSearch =
      !searchQuery ||
      trek.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trek.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trek.highlights.some((h:any) => h.toLowerCase().includes(searchQuery.toLowerCase()));

      return (
        matchesLocation &&
        matchesDifficulty &&
        matchesDuration &&
        matchesAltitude &&
        matchesSeason &&
        matchesBudget &&
        matchesSearch);

    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.popularity - a.popularity;
        case 'difficulty':
          const diffOrder = { Easy: 1, Moderate: 2, Hard: 3, Expert: 4 };
          return diffOrder[a.difficulty] - diffOrder[b.difficulty];
        case 'duration':
          return a.duration - b.duration;
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [mockTreks, activeFilters, searchQuery, sortBy]);

  const paginatedTreks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedTreks.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedTreks, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedTreks.length / itemsPerPage);

  const handleFilterChange = (filters: Partial<ActiveFilters>) => {
    setActiveFilters((prev) => ({ ...prev, ...filters }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setActiveFilters({
      location: '',
      difficulty: '',
      duration: [1, 30],
      altitude: [1000, 9000],
      season: '',
      budget: [500, 5000],
      searchQuery: ''
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleBookmarkToggle = (trekId: string) => {
    console.log('Bookmark toggled for trek:', trekId);
  };

  const sortOptions = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'difficulty', label: 'Difficulty' },
  { value: 'duration', label: 'Duration' },
  { value: 'alphabetical', label: 'A-Z' }];


  return (
    <>
      <Helmet>
        <title>Discover Nepal Treks | Nepal Trek Explorer</title>
        <meta
          name="description"
          content="Explore and filter through Nepal's most popular trekking routes. Find the perfect trek based on difficulty, duration, altitude, and season." />

      </Helmet>

      <div className="min-h-screen bg-background">
        <Header isAuthenticated={false} />

        <div className="pt-[60px]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb />

            <div className="py-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Discover Treks</h1>
                  <p className="text-muted-foreground mt-1">
                    Find your perfect adventure in the Himalayas
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    iconName="Grid3x3"
                    iconPosition="left">

                    Grid
                  </Button>
                  <Button
                    variant={viewMode === 'map' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('map')}
                    iconName="Map"
                    iconPosition="left">

                    Map
                  </Button>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
                <FilterSidebar
                  filters={filterOptions}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  resultCount={filteredAndSortedTreks.length}
                  isOpen={isFilterOpen}
                  onClose={() => setIsFilterOpen(false)} />


                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
                    <Button
                      variant="outline"
                      className="lg:hidden"
                      onClick={() => setIsFilterOpen(true)}
                      iconName="SlidersHorizontal"
                      iconPosition="left">

                      Filters
                    </Button>

                    <div className="flex-1">
                      <Input
                        type="search"
                        placeholder="Search treks, locations, highlights..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setCurrentPage(1);
                        }} />

                    </div>

                    <Select
                      options={sortOptions}
                      value={sortBy}
                      onChange={(value) => setSortBy(value as SortOption)}
                      placeholder="Sort by"
                      className="w-full sm:w-48" />

                  </div>

                  {viewMode === 'grid' ?
                  <>
                      {paginatedTreks.length > 0 ?
                    <>
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {paginatedTreks.map((trek) =>
                        <TrekCard
                          key={trek.id}
                          trek={trek}
                          onBookmarkToggle={handleBookmarkToggle} />

                        )}
                          </div>

                          {totalPages > 1 &&
                      <div className="flex items-center justify-center gap-2 mt-8">
                              <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          iconName="ChevronLeft">

                                Previous
                              </Button>

                              <div className="flex items-center gap-1">
                                {[...Array(totalPages)].map((_, i) =>
                          <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                            currentPage === i + 1 ?
                            'bg-primary text-primary-foreground' :
                            'bg-muted text-muted-foreground hover:bg-muted/80'}`
                            }>

                                    {i + 1}
                                  </button>
                          )}
                              </div>

                              <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                          iconName="ChevronRight"
                          iconPosition="right">

                                Next
                              </Button>
                            </div>
                      }
                        </> :

                    <div className="text-center py-16">
                          <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            No treks found
                          </h3>
                          <p className="text-muted-foreground mb-6">
                            Try adjusting your filters or search query
                          </p>
                          <Button variant="outline" onClick={handleClearFilters}>
                            Clear All Filters
                          </Button>
                        </div>
                    }
                    </> :

                  <MapView treks={filteredAndSortedTreks} />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>);

};

export default TrekListing;