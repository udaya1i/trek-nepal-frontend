export type ContentType = 'story' | 'photo' | 'video' | 'review';
export type ContentStatus = 'pending' | 'approved' | 'rejected' | 'flagged';
export type ModerationAction = 'approve' | 'reject' | 'flag';
export type ViolationType = 'spam' | 'inappropriate' | 'copyright' | 'misleading' | 'other';

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  thumbnail: string;
  thumbnailAlt: string;
  submittedBy: {
    id: string;
    name: string;
    avatar: string;
    avatarAlt: string;
    rating: number;
    totalSubmissions: number;
  };
  submittedAt: Date;
  status: ContentStatus;
  flagCount: number;
  viewCount: number;
  likeCount: number;
  content?: string;
  mediaUrl?: string;
  mediaAlt?: string;
  location?: string;
  tags: string[];
  violations?: ViolationType[];
}

export interface ModerationStats {
  totalPending: number;
  totalApproved: number;
  totalRejected: number;
  totalFlagged: number;
  avgReviewTime: string;
  todayReviewed: number;
}

export interface GuidelineViolation {
  type: ViolationType;
  count: number;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
}

export interface FilterOptions {
  contentType: ContentType | 'all';
  status: ContentStatus | 'all';
  dateRange: 'today' | 'week' | 'month' | 'all';
  userRating: number | 'all';
  sortBy: 'date' | 'flags' | 'views';
  sortOrder: 'asc' | 'desc';
}

export interface BulkAction {
  action: ModerationAction;
  selectedIds: string[];
  reason?: string;
}

export interface ModerationDecision {
  contentId: string;
  action: ModerationAction;
  reason?: string;
  violations?: ViolationType[];
  notes?: string;
}