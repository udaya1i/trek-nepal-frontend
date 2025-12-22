import React, { useState, useEffect } from 'react';
import { ChartDataPoint, DashboardMetric, Notification, QuickAction, RecentActivity } from './types';
import AdminHeader from 'components/admin-components/AdminHeader';
import AdminSidebar from 'components/admin-components/AdminSidebar';
import MetricCard from './components/MetricCard';
import SearchBar from './components/SearchBar';
import QuickActionCard from './components/QuickActionCard';
import RecentActivityList from './components/RecentActivityList';
import NotificationPanel from './components/NotificationPanel';
import EngagementChart from './components/EngagementChart';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const metrics: DashboardMetric[] = [
    {
      id: 'total-treks',
      label: 'Total Treks',
      value: 156,
      change: 12.5,
      changeType: 'increase',
      icon: 'Mountain',
      color: 'bg-primary/10 text-primary',
    },
    {
      id: 'active-users',
      label: 'Active Users',
      value: 8432,
      change: 8.2,
      changeType: 'increase',
      icon: 'Users',
      color: 'bg-secondary/10 text-secondary',
    },
    {
      id: 'pending-reviews',
      label: 'Pending Reviews',
      value: 23,
      change: 15.3,
      changeType: 'decrease',
      icon: 'FileCheck',
      color: 'bg-warning/10 text-warning',
    },
    {
      id: 'monthly-revenue',
      label: 'Monthly Revenue',
      value: 245680,
      change: 18.7,
      changeType: 'increase',
      icon: 'DollarSign',
      color: 'bg-success/10 text-success',
    },
  ];

  const quickActions: QuickAction[] = [
    {
      id: 'trek-management',
      title: 'Trek Management',
      description: 'Manage trek listings, routes, and details',
      icon: 'Mountain',
      count: 156,
      path: '/trek-management',
      color: 'bg-primary/10 text-primary',
    },
    {
      id: 'user-oversight',
      title: 'User Management',
      description: 'View and manage user accounts',
      icon: 'Users',
      count: 8432,
      path: '/user-management',
      color: 'bg-secondary/10 text-secondary',
    },
    {
      id: 'content-moderation',
      title: 'Content Moderation',
      description: 'Review pending stories and media',
      icon: 'FileCheck',
      count: 23,
      path: '/content-moderation',
      color: 'bg-warning/10 text-warning',
    },
    {
      id: 'safety-updates',
      title: 'Safety Management',
      description: 'Monitor trail conditions and alerts',
      icon: 'AlertTriangle',
      count: 3,
      path: '/safety-management',
      color: 'bg-error/10 text-error',
    },
  ];

  const chartData: ChartDataPoint[] = [
    { date: '12/14', users: 1240, bookings: 45, revenue: 12500 },
    { date: '12/15', users: 1380, bookings: 52, revenue: 14200 },
    { date: '12/16', users: 1520, bookings: 48, revenue: 13800 },
    { date: '12/17', users: 1450, bookings: 61, revenue: 16400 },
    { date: '12/18', users: 1680, bookings: 58, revenue: 15900 },
    { date: '12/19', users: 1820, bookings: 67, revenue: 18200 },
    { date: '12/20', users: 1950, bookings: 72, revenue: 19800 },
    { date: '12/21', users: 2100, bookings: 78, revenue: 21500 },
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'trek',
      action: 'New trek "Annapurna Circuit Extended" submitted for review',
      user: 'Rajesh Kumar',
      timestamp: new Date(Date.now() - 300000),
      status: 'pending',
    },
    {
      id: '2',
      type: 'user',
      action: 'User account "sarah.wilson@email.com" registered',
      user: 'Sarah Wilson',
      timestamp: new Date(Date.now() - 900000),
      status: 'approved',
    },
    {
      id: '3',
      type: 'content',
      action: 'Story "My Journey to Everest Base Camp" approved',
      user: 'Michael Chen',
      timestamp: new Date(Date.now() - 1800000),
      status: 'approved',
    },
    {
      id: '4',
      type: 'safety',
      action: 'Trail closure alert posted for Langtang Valley',
      user: 'Admin Team',
      timestamp: new Date(Date.now() - 3600000),
      status: 'approved',
    },
    {
      id: '5',
      type: 'content',
      action: 'Photo submission flagged for review',
      user: 'David Martinez',
      timestamp: new Date(Date.now() - 7200000),
      status: 'pending',
    },
  ];

  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'content',
        title: 'New trek submission pending review',
        description: 'Rajesh Kumar submitted "Annapurna Circuit Extended" for approval',
        timestamp: new Date(Date.now() - 120000),
        priority: 'high',
        isRead: false,
      },
      {
        id: '2',
        type: 'user',
        title: 'New user registration',
        description: 'Sarah Wilson created an account from United States',
        timestamp: new Date(Date.now() - 900000),
        priority: 'medium',
        isRead: false,
      },
      {
        id: '3',
        type: 'safety',
        title: 'Weather alert requires attention',
        description: 'Heavy snowfall warning for Everest region needs review',
        timestamp: new Date(Date.now() - 1800000),
        priority: 'high',
        isRead: false,
      },
      {
        id: '4',
        type: 'booking',
        title: 'Booking milestone reached',
        description: 'Platform reached 1000 bookings this month',
        timestamp: new Date(Date.now() - 3600000),
        priority: 'low',
        isRead: true,
      },
    ];
    setNotifications(mockNotifications);
  }, []);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif))
    );
  };

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        userRole="admin"
      />

      <div className="lg:pl-60">
        <AdminHeader
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          userName="Admin User"
          userRole="Administrator"
          notificationCount={notifications.filter((n) => !n.isRead).length}
          userAvatar=""
        />

        <main className="pt-16">
          <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                Dashboard Overview
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Welcome back! Here's what's happening with Nepal Trek Explorer today.
              </p>
            </div>

            <div className="mb-6 md:mb-8">
              <SearchBar onSearch={handleSearch} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              {metrics.map((metric) => (
                <MetricCard key={metric.id} metric={metric} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
              <div className="space-y-6 md:space-y-8">
                <div>
                  <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4">
                    Quick Actions
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {quickActions.map((action) => (
                      <QuickActionCard key={action.id} action={action} />
                    ))}
                  </div>
                </div>

                <RecentActivityList activities={recentActivities} />
              </div>

              <div className="space-y-6 md:space-y-8">
                <NotificationPanel
                  notifications={notifications}
                  onMarkAsRead={handleMarkAsRead}
                />
              </div>
            </div>

            <div className="mb-6 md:mb-8">
              <EngagementChart data={chartData} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="w-full min-w-0 bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-5 h-5 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L2 7L12 12L22 7L12 2Z"
                        fill="currentColor"
                      />
                      <path
                        d="M2 17L12 22L22 17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 12L12 17L22 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
                    System Status
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground caption">Server Status</span>
                    <span className="flex items-center gap-2 text-sm font-medium text-success">
                      <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      Operational
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground caption">Database</span>
                    <span className="flex items-center gap-2 text-sm font-medium text-success">
                      <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      Connected
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground caption">API Services</span>
                    <span className="flex items-center gap-2 text-sm font-medium text-success">
                      <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      Active
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full min-w-0 bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-5 h-5 text-accent"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L2 7L12 12L22 7L12 2Z"
                        fill="currentColor"
                      />
                      <path
                        d="M2 17L12 22L22 17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 12L12 17L22 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
                    Quick Stats
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground caption">Today's Signups</span>
                    <span className="text-sm font-medium text-foreground data-text">127</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground caption">Active Sessions</span>
                    <span className="text-sm font-medium text-foreground data-text">1,842</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground caption">Avg. Response Time</span>
                    <span className="text-sm font-medium text-foreground data-text">124ms</span>
                  </div>
                </div>
              </div>

              <div className="w-full min-w-0 bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-5 h-5 text-secondary"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L2 7L12 12L22 7L12 2Z"
                        fill="currentColor"
                      />
                      <path
                        d="M2 17L12 22L22 17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 12L12 17L22 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
                    Platform Health
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground caption">Uptime</span>
                    <span className="text-sm font-medium text-success">99.98%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground caption">Error Rate</span>
                    <span className="text-sm font-medium text-success">0.02%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground caption">Last Backup</span>
                    <span className="text-sm font-medium text-foreground">2h ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;