export interface Trek {
  id: string;
  name: string;
  region: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Strenuous' | 'Extreme';
  duration: number;
  maxAltitude: number;
  bestSeason: string;
  permitRequired: boolean;
  status: 'Published' | 'Draft' | 'Under Review' | 'Archived';
  featured: boolean;
  lastUpdated: Date;
  createdAt: Date;
  price: {
    min: number;
    max: number;
    currency: string;
  };
  route: {
    startPoint: string;
    endPoint: string;
    totalDistance: number;
  };
  safety: {
    riskLevel: 'Low' | 'Medium' | 'High' | 'Extreme';
    emergencyContacts: string[];
    medicalFacilities: boolean;
  };
  images: {
    url: string;
    alt: string;
  }[];
  description: string;
  highlights: string[];
  requirements: string[];
  bookingCount: number;
  rating: number;
  reviewCount: number;
}

export interface TrekFilters {
  search: string;
  difficulty: string[];
  region: string[];
  durationMin: number;
  durationMax: number;
  permitRequired: boolean | null;
  status: string[];
  featured: boolean | null;
}

export interface TrekStats {
  total: number;
  published: number;
  draft: number;
  underReview: number;
  archived: number;
  featured: number;
}

export interface BulkAction {
  type: 'status' | 'featured' | 'delete' | 'export';
  value?: string | boolean;
}

export interface SortConfig {
  field: keyof Trek;
  direction: 'asc' | 'desc';
}