export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  avatarAlt: string;
  accountType: 'trekker' | 'guide' | 'hotel_owner' | 'admin';
  registrationDate: Date;
  lastActive: Date;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  activityLevel: 'high' | 'medium' | 'low';
  totalBookings: number;
  totalReviews: number;
  totalStories: number;
  reportCount: number;
  verificationStatus: 'verified' | 'unverified' | 'pending';
  phone?: string;
  location?: string;
  joinedFrom?: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newRegistrations: number;
  suspendedAccounts: number;
  verifiedUsers: number;
  pendingVerifications: number;
}

export interface UserActivity {
  id: string;
  userId: string;
  type: 'login' | 'booking' | 'review' | 'story' | 'report';
  description: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface UserReport {
  id: string;
  reportedUserId: string;
  reportedBy: string;
  reason: string;
  description: string;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  createdAt: Date;
  resolvedAt?: Date;
  resolvedBy?: string;
}

export interface FilterOptions {
  accountType: string[];
  status: string[];
  activityLevel: string[];
  verificationStatus: string[];
  registrationPeriod: {
    start: Date | null;
    end: Date | null;
  };
}

export interface SortConfig {
  field: keyof User;
  direction: 'asc' | 'desc';
}

export interface BulkAction {
  type: 'activate' | 'deactivate' | 'suspend' | 'verify' | 'export';
  userIds: string[];
}