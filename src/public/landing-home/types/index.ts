export interface Trek {
  id: string;
  name: string;
  location: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Expert';
  duration: string;
  maxAltitude: string;
  image: string;
  alt: string;
  rating: number;
  reviews: number;
  price: string;
  bestSeason: string;
}

export interface TrekCategory {
  id: string;
  name: string;
  icon: string;
  image: string;
  alt: string;
  trekCount: number;
}

export interface CommunityStory {
  id: string;
  author: string;
  authorAvatar: string;
  authorAvatarAlt: string;
  trekName: string;
  image: string;
  alt: string;
  likes: number;
  comments: number;
  timeAgo: string;
  excerpt: string;
}

export interface PlatformStats {
  totalTreks: number;
  verifiedGuides: number;
  communityMembers: number;
  storiesShared: number;
}

export interface SearchSuggestion {
  id: string;
  type: 'trek' | 'location' | 'service';
  name: string;
  category?: string;
}