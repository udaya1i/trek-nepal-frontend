import React from 'react';
import { Notification } from '../types';
import Icon from 'components/ui/AppIcon';

interface NotificationPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

const NotificationPanel = ({ notifications, onMarkAsRead }: NotificationPanelProps) => {
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'user':
        return 'UserPlus';
      case 'content':
        return 'FileText';
      case 'safety':
        return 'AlertTriangle';
      case 'booking':
        return 'Calendar';
      default:
        return 'Bell';
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-error/10 text-error';
      case 'medium':
        return 'bg-warning/10 text-warning';
      case 'low':
        return 'bg-muted text-muted-foreground';
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
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
            Recent Notifications
          </h2>
          <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md">
            {notifications.filter((n) => !n.isRead).length} New
          </span>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Bell" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground caption">No notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-muted/50 transition-smooth cursor-pointer ${
                  !notification.isRead ? 'bg-primary/5' : ''
                }`}
                onClick={() => onMarkAsRead(notification.id)}
              >
                <div className="flex gap-3">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${getPriorityColor(
                      notification.priority
                    )}`}
                  >
                    <Icon name={getNotificationIcon(notification.type)} size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm font-medium text-foreground line-clamp-1">
                        {notification.title}
                      </h4>
                      {!notification.isRead && (
                        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground caption line-clamp-2 mb-2">
                      {notification.description}
                    </p>
                    <span className="text-xs text-muted-foreground caption">
                      {formatTimestamp(notification.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 border-t border-border">
        <button className="w-full text-sm text-accent hover:text-accent/80 font-medium transition-smooth">
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationPanel;