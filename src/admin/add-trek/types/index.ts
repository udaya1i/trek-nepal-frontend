export interface TrekFormData {
  // Basic Information
  name: string;
  region: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Strenuous' | 'Extreme';
  duration: number;
  maxAltitude: number;
  bestSeason: string[];
  permitRequired: boolean;
  
  // Route Details
  route: {
    startPoint: string;
    endPoint: string;
    totalDistance: number;
    waypoints: Waypoint[];
  };
  
  // Pricing
  price: {
    min: number;
    max: number;
    currency: string;
  };
  
  // Safety Information
  safety: {
    riskLevel: 'Low' | 'Medium' | 'High' | 'Extreme';
    emergencyContacts: string[];
    medicalFacilities: boolean;
    requiredExperience: string;
  };
  
  // Description & Details
  description: string;
  highlights: string[];
  requirements: string[];
  includedServices: string[];
  excludedServices: string[];
  
  // Itinerary
  itinerary: ItineraryDay[];
  
  // Images
  images: TrekImage[];
  
  // Permits
  permits: PermitInfo[];
  
  // Status
  status: 'Published' | 'Draft' | 'Under Review';
  featured: boolean;
}

export interface Waypoint {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  altitude: number;
  order: number;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  distance: number;
  altitude: number;
  accommodationType: string;
  meals: string[];
}

export interface TrekImage {
  id: string;
  url: string;
  alt: string;
  caption: string;
  isPrimary: boolean;
}

export interface PermitInfo {
  id: string;
  name: string;
  cost: number;
  issuingAuthority: string;
  processingTime: string;
  required: boolean;
}

export interface FormSection {
  id: string;
  title: string;
  isComplete: boolean;
  hasErrors: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}