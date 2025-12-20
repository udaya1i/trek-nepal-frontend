'use client';

import Icon from 'components/ui/AppIcon';
import React, { useState, useRef, useEffect } from 'react';
 
interface Notification {
  id: string;
  type: 'comment' | 'follow' | 'safety' | 'booking';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const NotificationBell = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'comment',
      title: 'New Comment',
      message: 'Sarah commented on your Everest Base Camp story',
      time: '5 min ago',
      isRead: false,
    },
    {
      id: '2',
      type: 'follow',
      title: 'New Follower',
      message: 'Mike started following you',
      time: '1 hour ago',
      isRead: false,
    },
    {
      id: '3',
      type: 'safety',
      title: 'Weather Alert',
      message: 'Heavy snowfall expected in Annapurna region',
      time: '2 hours ago',
      isRead: true,
    },
  ]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'comment':
        return 'ChatBubbleLeftIcon';
      case 'follow':
        return 'UserPlusIcon';
      case 'safety':
        return 'ExclamationTriangleIcon';
      case 'booking':
        return 'CheckCircleIcon';
      default:
        return 'BellIcon';
    }
  };

  const handleNotificationClick = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="relative p-2 rounded-lg hover:bg-muted transition-smooth"
        aria-label="Notifications"
      >
        <Icon name="BellIcon" size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-medium rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-popover border border-border rounded-xl shadow-warm-lg overflow-hidden z-[200]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-heading font-semibold text-lg text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-sm text-primary hover:underline transition-smooth"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-border">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    className={`w-full p-4 text-left hover:bg-muted transition-smooth flex gap-3 ${
                      !notification.isRead ? 'bg-muted/50' : ''
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        notification.type === 'safety' ?'bg-warning/10 text-warning' :'bg-primary/10 text-primary'
                      }`}
                    >
                      <Icon name={getNotificationIcon(notification.type) as any} size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-medium text-foreground">{notification.title}</span>
                        {!notification.isRead && (
                          <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-1">
                        {notification.message}
                      </p>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Icon name="BellIcon" size={48} className="mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No notifications yet</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-border p-3">
              <button className="w-full py-2 text-center text-primary hover:underline transition-smooth">
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;