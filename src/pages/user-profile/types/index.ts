export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  coverImage: string;
  bio: string;
  location: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  joinedDate: Date;
  isVerified: boolean;
  stats: UserStats;
  badges: Badge[];
  completedTreks: CompletedTrek[];
  stories: UserStory[];
  savedTreks: SavedTrek[];
  followers: number;
  following: number;
  isFollowing?: boolean;
}

export interface UserStats {
  totalTreks: number;
  totalDistance: number;
  totalElevation: number;
  totalDays: number;
  storiesShared: number;
  reviewsWritten: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'difficulty' | 'region' | 'achievement' | 'community';
  earnedDate: Date;
  progress?: number;
  maxProgress?: number;
}

export interface CompletedTrek {
  id: string;
  trekId: string;
  trekName: string;
  trekImage: string;
  trekImageAlt: string;
  difficulty: 'easy' | 'moderate' | 'hard' | 'expert';
  duration: number;
  completedDate: Date;
  rating: number;
  hasReview: boolean;
  hasStory: boolean;
}

export interface UserStory {
  id: string;
  title: string;
  coverImage: string;
  coverImageAlt: string;
  trekName: string;
  publishedDate: Date;
  likes: number;
  comments: number;
  views: number;
}

export interface SavedTrek {
  id: string;
  trekId: string;
  trekName: string;
  trekImage: string;
  trekImageAlt: string;
  difficulty: 'easy' | 'moderate' | 'hard' | 'expert';
  duration: number;
  savedDate: Date;
  collection?: string;
}

export interface ProfileSettings {
  privacy: {
    showEmail: boolean;
    showLocation: boolean;
    showStats: boolean;
    showCompletedTreks: boolean;
  };
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    followNotifications: boolean;
    commentNotifications: boolean;
    likeNotifications: boolean;
  };
}

export type ViewMode = 'public' | 'private';
export type ActiveTab = 'overview' | 'treks' | 'stories' | 'saved' | 'settings';