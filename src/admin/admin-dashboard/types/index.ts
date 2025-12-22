export interface DashboardMetric {
  id: string;
  label: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
  color: string;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  count: number;
  path: string;
  color: string;
}

export interface Notification {
  id: string;
  type: 'user' | 'content' | 'safety' | 'booking';
  title: string;
  description: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high';
  isRead: boolean;
}

export interface ChartDataPoint {
  date: string;
  users: number;
  bookings: number;
  revenue: number;
}

export interface RecentActivity {
  id: string;
  type: 'trek' | 'user' | 'content' | 'safety';
  action: string;
  user: string;
  timestamp: Date;
  status: 'pending' | 'approved' | 'rejected';
}