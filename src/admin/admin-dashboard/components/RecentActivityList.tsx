import React from 'react';
import { RecentActivity } from '../types';
import Icon from 'components/ui/AppIcon';

interface RecentActivityListProps {
  activities: RecentActivity[];
}

const RecentActivityList = ({ activities }: RecentActivityListProps) => {
  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'trek':
        return 'Mountain';
      case 'user':
        return 'User';
      case 'content':
        return 'FileText';
      case 'safety':
        return 'AlertTriangle';
      default:
        return 'Activity';
    }
  };

  const getStatusColor = (status: RecentActivity['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-success/10 text-success';
      case 'rejected':
        return 'bg-error/10 text-error';
      case 'pending':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="w-full min-w-0 bg-card border border-border rounded-lg shadow-elevation-2">
      <div className="p-4 md:p-6 border-b border-border">
        <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
          Recent Activity
        </h2>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Activity" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground caption">No recent activity</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {activities.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-muted/50 transition-smooth">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon
                      name={getActivityIcon(activity.type)}
                      size={18}
                      className="text-primary"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm text-foreground line-clamp-2">{activity.action}</p>
                      <span
                        className={`flex-shrink-0 px-2 py-1 text-xs font-medium rounded-md ${getStatusColor(
                          activity.status
                        )}`}
                      >
                        {activity.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground caption">
                      <span>{activity.user}</span>
                      <span>•</span>
                      <span>{formatTimestamp(activity.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 border-t border-border">
        <button className="w-full text-sm text-accent hover:text-accent/80 font-medium transition-smooth">
          View all activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivityList;