export interface Trek {
  id: string;
  name: string;
  location: string;
  region: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Expert';
  duration: number;
  maxAltitude: number;
  bestSeason: string[];
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  alt: string;
  highlights: string[];
  isBookmarked: boolean;
  popularity: number;
}

export interface FilterOptions {
  locations: string[];
  difficulties: Array<'Easy' | 'Moderate' | 'Hard' | 'Expert'>;
  durationRange: [number, number];
  altitudeRange: [number, number];
  seasons: string[];
  budgetRange: [number, number];
}

export interface ActiveFilters {
  location: string;
  difficulty: string;
  duration: [number, number];
  altitude: [number, number];
  season: string;
  budget: [number, number];
  searchQuery: string;
}

export type SortOption = 'popularity' | 'difficulty' | 'duration' | 'alphabetical';
export type ViewMode = 'grid' | 'map';