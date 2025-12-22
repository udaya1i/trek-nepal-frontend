export interface TrekImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

export interface TrekStats {
  duration: string;
  difficulty: "Easy" | "Moderate" | "Hard" | "Expert";
  maxAltitude: string;
  distance: string;
  bestSeason: string;
  groupSize: string;
}

export interface PermitInfo {
  name: string;
  cost: string;
  description: string;
}

export interface PackingItem {
  category: string;
  items: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  altitude: string;
  duration: string;
  distance: string;
  accommodation: string;
  meals: string;
}

export interface RoutePoint {
  lat: number;
  lng: number;
  altitude: number;
  name: string;
}

export interface clear {
  distance: number;
  altitude: number;
  location: string;
}

export interface Hotel {
  id: string;
  name: string;
  image: string;
  alt: string;
  rating: number;
  priceRange: string;
  location: string;
  verified: boolean;
  amenities: string[];
  contact: {
    phone: string;
    whatsapp: string;
    viber: string;
  };
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  avatarAlt: string;
  date: string;
  rating: number;
  difficultyRating: number;
  sceneryRating: number;
  accommodationRating: number;
  safetyRating: number;
  verified: boolean;
  content: string;
  helpful: number;
  images?: Array<{ url: string; alt: string }>;
}

export interface SafetyAlert {
  id: string;
  type: "warning" | "info" | "danger";
  title: string;
  description: string;
  date: string;
}

export interface WeatherData {
  day: string;
  temp: string;
  condition: string;
  icon: string;
  precipitation: string;
}

export interface SimilarTrek {
  id: string;
  name: string;
  image: string;
  alt: string;
  duration: string;
  difficulty: string;
  rating: number;
}

export interface Trek {
  id: string;
  name: string;
  region: string;
  description: string;
  longDescription: string;
  images: TrekImage[];
  stats: TrekStats;
  permits: PermitInfo[];
  packingList: PackingItem[];
  itinerary: ItineraryDay[];
  routePoints: RoutePoint[];
  elevationProfile: ElevationPoint[];
  hotels: Hotel[];
  reviews: Review[];
  safetyAlerts: SafetyAlert[];
  weather: WeatherData[];
  similarTreks: SimilarTrek[];
  rating: number;
  totalReviews: number;
  bookmarked: boolean;
}

export type TabType = "overview" | "route" | "itinerary" | "hotels" | "reviews" | "safety";


export interface TrekImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

export interface TrekStats {
  duration: string;
  difficulty: "Easy" | "Moderate" | "Hard" | "Expert";
  maxAltitude: string;
  distance: string;
  bestSeason: string;
  groupSize: string;
}

export interface PermitInfo {
  name: string;
  cost: string;
  description: string;
}

export interface PackingItem {
  category: string;
  items: string[];
}

export interface CheckpointPhoto {
  id: string;
  url: string;
  alt_text: string;
  caption?: string;
}

export interface CheckpointActivity {
  id: string;
  name: string;
  description: string;
  duration?: string;
  difficulty?: 'easy' | 'moderate' | 'hard';
}

export interface Checkpoint {
  id: string;
  name: string;
  type: 'village' | 'viewpoint' | 'pass' | 'glacier' | 'religious_site' | 'settlement' | 'base_camp';
  altitude: number;
  short_description: string;
  long_description: string;
  significance: string[];
  photos: CheckpointPhoto[];
  activities: CheckpointActivity[];
  has_wifi: boolean;
  wifi_cost?: string;
  has_charging: boolean;
  charging_cost?: string;
  has_hot_shower: boolean;
  shower_cost?: string;
  has_atm: boolean;
  atm_notes?: string;
  typical_night_temp?: string;
  best_time_to_visit?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  altitude: string;
  duration: string;
  distance: string;
  accommodation: string;
  meals: string;
  checkpoints: Checkpoint[];
  isHighlight?: boolean;
  notes?: string;
}

export interface RoutePoint {
  lat: number;
  lng: number;
  altitude: number;
  name: string;
  checkpoint?: Checkpoint;
}

export interface ElevationPoint {
  distance: number;
  altitude: number;
  location: string;
}

export interface Hotel {
  id: string;
  name: string;
  image: string;
  alt: string;
  rating: number;
  priceRange: string;
  location: string;
  verified: boolean;
  amenities: string[];
  contact: {
    phone: string;
    whatsapp: string;
    viber: string;
  };
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  avatarAlt: string;
  date: string;
  rating: number;
  difficultyRating: number;
  sceneryRating: number;
  accommodationRating: number;
  safetyRating: number;
  verified: boolean;
  content: string;
  helpful: number;
  images?: Array<{ url: string; alt: string }>;
}

export interface SafetyAlert {
  id: string;
  type: "warning" | "info" | "danger";
  title: string;
  description: string;
  date: string;
}

export interface WeatherData {
  day: string;
  temp: string;
  condition: string;
  icon: string;
  precipitation: string;
}

export interface SimilarTrek {
  id: string;
  name: string;
  image: string;
  alt: string;
  duration: string;
  difficulty: string;
  rating: number;
}

export interface Trek {
  id: string;
  name: string;
  region: string;
  description: string;
  longDescription: string;
  images: TrekImage[];
  stats: TrekStats;
  permits: PermitInfo[];
  packingList: PackingItem[];
  itinerary: ItineraryDay[];
  routePoints: RoutePoint[];
  elevationProfile: ElevationPoint[];
  hotels: Hotel[];
  reviews: Review[];
  safetyAlerts: SafetyAlert[];
  weather: WeatherData[];
  similarTreks: SimilarTrek[];
  rating: number;
  totalReviews: number;
  bookmarked: boolean;
}

