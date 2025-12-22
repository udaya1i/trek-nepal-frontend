import React from 'react';
import { UserStats } from '../types';
import Icon from 'components/ui/AppIcon';

interface UserStatsCardProps {
  stats: UserStats;
}

const UserStatsCard = ({ stats }: UserStatsCardProps) => {
  const statItems = [
    {
      label: 'Total Users',
      value: stats.totalUsers,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      label: 'Active Users',
      value: stats.activeUsers,
      icon: 'UserCheck',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+8%',
      changeType: 'positive' as const,
    },
    {
      label: 'New This Month',
      value: stats.newRegistrations,
      icon: 'UserPlus',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: '+24%',
      changeType: 'positive' as const,
    },
    {
      label: 'Suspended',
      value: stats.suspendedAccounts,
      icon: 'UserX',
      color: 'text-error',
      bgColor: 'bg-error/10',
      change: '-5%',
      changeType: 'negative' as const,
    },
    {
      label: 'Verified Users',
      value: stats.verifiedUsers,
      icon: 'ShieldCheck',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      change: '+15%',
      changeType: 'positive' as const,
    },
    {
      label: 'Pending Verification',
      value: stats.pendingVerifications,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: '+3',
      changeType: 'neutral' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="w-full min-w-0 bg-card border border-border rounded-lg p-4 md:p-6 hover:shadow-elevation-2 transition-smooth"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg ${item.bgColor}`}>
              <Icon name={item.icon} size={20} className={item.color} />
            </div>
            <span
              className={`text-xs font-medium caption px-2 py-1 rounded ${
                item.changeType === 'positive' ?'text-success bg-success/10'
                  : item.changeType === 'negative' ?'text-error bg-error/10' :'text-muted-foreground bg-muted'
              }`}
            >
              {item.change}
            </span>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-heading font-bold text-foreground whitespace-nowrap mb-1">
              {item.value.toLocaleString()}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground caption line-clamp-1">
              {item.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStatsCard;