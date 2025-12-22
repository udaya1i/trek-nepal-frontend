import React, { useState } from 'react';
import Image from 'components/ui/AppImage';
import Icon from 'components/ui/AppIcon';
interface AdminHeaderProps {
  onMenuToggle?: () => void;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  notificationCount?: number;
}

const AdminHeader = ({
  onMenuToggle,
  userName = 'Admin User',
  userRole = 'Administrator',
  userAvatar,
  notificationCount = 0,
}: AdminHeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    window.location.href = '/admin-login';
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-60 z-navigation bg-card border-b border-border h-16">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-muted transition-smooth focus-ring"
            aria-label="Toggle menu"
          >
            <Icon name="Menu" size={20} />
          </button>

          <div className="hidden lg:block">
            <h1 className="text-lg font-heading font-semibold text-foreground">
              Nepal Trek Explorer Admin
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex items-center justify-center w-10 h-10 rounded-md hover:bg-muted transition-smooth focus-ring"
              aria-label="Notifications"
            >
              <Icon name="Bell" size={20} />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 text-xs font-medium text-error-foreground bg-error rounded-full">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-elevation-3 overflow-hidden animate-slideDown">
                <div className="p-4 border-b border-border">
                  <h3 className="font-heading font-semibold text-sm">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notificationCount === 0 ? (
                    <div className="p-8 text-center text-muted-foreground caption">
                      No new notifications
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      <div className="p-4 hover:bg-muted transition-smooth cursor-pointer">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-accent" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">
                              New trek submission pending review
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              2 minutes ago
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-border">
                  <button className="w-full text-sm text-accent hover:text-accent/80 font-medium transition-smooth">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-smooth focus-ring"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary overflow-hidden">
                {userAvatar ? (
                  <Image
                    src={userAvatar}
                    alt={userName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary-foreground font-medium text-sm">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground caption">{userRole}</p>
              </div>
              <Icon name="ChevronDown" size={16} className="hidden md:block" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevation-3 overflow-hidden animate-slideDown">
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-medium text-foreground">{userName}</p>
                  <p className="text-xs text-muted-foreground caption mt-1">
                    {userRole}
                  </p>
                </div>
                <div className="py-2">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth">
                    <Icon name="User" size={16} />
                    Profile Settings
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth">
                    <Icon name="Settings" size={16} />
                    Preferences
                  </button>
                </div>
                <div className="border-t border-border py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-error hover:bg-muted transition-smooth"
                  >
                    <Icon name="LogOut" size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;