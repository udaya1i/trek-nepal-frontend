import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SafetyAlertIndicator from './SafetyAlertIndicator';
import Icon from 'components/ui/AppIcon';
import NavigationGroup from 'components/common/NavigationGroup';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  userRole?: 'admin' | 'moderator' | 'coordinator';
}

const AdminSidebar = ({
  isOpen = false,
  onClose,
  userRole = 'admin',
}: AdminSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['content-management']);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  const isActive = (path: string) => location.pathname === path;

  const dashboardItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/admin-dashboard',
    },
  ];

  const contentManagementItems = [
    {
      id: 'trek-management',
      label: 'Trek Management',
      icon: 'Mountain',
      path: '/trek-management',
      description: 'Manage trek listings and details',
    },
    {
      id: 'user-management',
      label: 'User Management',
      icon: 'Users',
      path: '/user-management',
      description: 'Manage user accounts and permissions',
    },
    {
      id: 'content-moderation',
      label: 'Content Moderation',
      icon: 'FileCheck',
      path: '/content-moderation',
      description: 'Review and approve content submissions',
    },
  ];

  const safetyOperationsItems = [
    {
      id: 'safety-management',
      label: 'Safety Management',
      icon: 'AlertTriangle',
      path: '/safety-management',
      description: 'Monitor trail conditions and emergencies',
      badge: <SafetyAlertIndicator count={3} priority="high" />,
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[90] lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-card border-r border-border z-navigation transition-transform duration-250 ease-smooth lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    fill="currentColor"
                    className="text-primary-foreground"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary-foreground"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary-foreground"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-heading font-semibold text-foreground leading-tight">
                  Nepal Trek
                </span>
                <span className="text-xs text-muted-foreground caption leading-tight">
                  Admin Portal
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="lg:hidden flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-smooth focus-ring"
              aria-label="Close menu"
            >
              <Icon name="X" size={18} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <div className="space-y-6">
              <div>
                {dashboardItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-smooth ${
                      isActive(item.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item.icon} size={18} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              <NavigationGroup
                title="Content Management"
                isExpanded={expandedGroups.includes('content-management')}
                onToggle={() => toggleGroup('content-management')}
              >
                {contentManagementItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-smooth ${
                      isActive(item.path)
                        ? 'bg-primary/10 text-primary font-medium' :'text-foreground hover:bg-muted'
                    }`}
                    title={item.description}
                  >
                    <Icon name={item.icon} size={18} />
                    <span className="flex-1 text-left">{item.label}</span>
                  </button>
                ))}
              </NavigationGroup>

              <NavigationGroup
                title="Safety Operations"
                isExpanded={expandedGroups.includes('safety-operations')}
                onToggle={() => toggleGroup('safety-operations')}
              >
                {safetyOperationsItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-smooth ${
                      isActive(item.path)
                        ? 'bg-primary/10 text-primary font-medium' :'text-foreground hover:bg-muted'
                    }`}
                    title={item.description}
                  >
                    <Icon name={item.icon} size={18} />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge}
                  </button>
                ))}
              </NavigationGroup>
            </div>
          </nav>

          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-muted/50">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-success animate-pulse" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground caption">
                  System Status
                </p>
                <p className="text-xs text-muted-foreground caption">
                  All systems operational
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;