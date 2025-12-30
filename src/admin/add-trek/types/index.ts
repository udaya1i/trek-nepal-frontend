export enum DifficultyLevel {
  EASY = 'EASY',
  MODERATE = 'MODERATE',
  CHALLENGING = 'CHALLENGING',
  STRENUOUS = 'STRENUOUS',
  EXTREME = 'EXTREME',
}

export enum WaypointType {
  VILLAGE = 'VILLAGE',
  VIEWPOINT = 'VIEWPOINT',
  CAMP = 'CAMP',
  PASS = 'PASS',
  MONASTERY = 'MONASTERY',
  LAKE = 'LAKE',
  WATERFALL = 'WATERFALL',
  SUMMIT = 'SUMMIT',
}

export enum TrekStatus {
  DRAFT = 'Draft',
  UNDER_REVIEW = 'Under Review',
  PUBLISHED = 'Published',
}

export interface Trek {
  id: number;
  name: string;
  subtitle?: string;
  difficultyLevel: DifficultyLevel;
  durationDays: string;
  maxAltitude: number;
  totalDistance: number;
  bestSeason: string;
  aboutTrek: string;
  startPoint: string;
  endPoint: string;
  highestPoint: number;
  lowestPoint: number;
  province: string;
  district: string;
  localLevel: string;
  totalAscent?: number;
  totalDescent?: number;
  status: TrekStatus;
  region?: string;
  lastUpdated?: string;
  images?: string[];
}

export interface TrekItinerary {
  id: number;
  dayNumber: number;
  startLocation: string;
  endLocation: string;
  durationHours: number;
  altitudeGain?: number;
  altitudeLoss?: number;
  trekShortDescription: string;
  trekFullDescription: string;
  temperature?: string;
  trek: number;
  images?: string[];
}

export interface TrekWaypoint {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  altitude: number;
  waypointType: WaypointType;
  shorDescription: string;
  fullDescription: string;
  trekId: number;
  images: string[];
}

export interface Permit {
  id: number;
  name: string;
  description?: string;
  issuingAuthority?: string;
  cost?: number;
  validityDays?: number;
  trek: number;
}

export interface TrekPacking {
  id: number;
  name: string;
  items: string[];
  trek: number;
}

export interface TrekFormData {
  name: string;
  subtitle?: string;
  difficultyLevel: DifficultyLevel | '';
  durationDays: string;
  maxAltitude: string;
  totalDistance: string;
  bestSeason: string;
  aboutTrek: string;
  startPoint: string;
  endPoint: string;
  highestPoint: string;
  lowestPoint: string;
  province: string;
  district: string;
  localLevel: string;
  totalAscent: string;
  totalDescent: string;
  region?: string;
}
