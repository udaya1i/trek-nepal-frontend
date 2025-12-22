export interface Author {
  id: string;
  name: string;
  avatar: string;
  avatarAlt: string;
  isVerified: boolean;
  followersCount: number;
}

export interface Trek {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Expert';
  location: string;
}

export interface Story {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  author: Author;
  trek: Trek;
  publishedAt: Date;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  contentType: 'Trail Condition' | 'Cultural Experience' | 'Safety Update' | 'Travel Tips' | 'Photo Story';
  tags: string[];
}

export interface FilterOptions {
  location: string;
  difficulty: string;
  contentType: string;
  sortBy: 'recent' | 'popular' | 'trending';
}

export interface StoryCardProps {
  story: Story;
  onLike: (storyId: string) => void;
  onBookmark: (storyId: string) => void;
  onShare: (storyId: string) => void;
}

export interface FilterSidebarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

export interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
}