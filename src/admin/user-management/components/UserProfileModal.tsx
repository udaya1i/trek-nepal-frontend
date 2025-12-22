import React, { useState } from 'react';
import { User, UserActivity, UserReport } from '../types';
import Button from 'components/ui/Button';
import AppImage from 'components/ui/AppImage';
import Icon from 'components/ui/AppIcon';

interface UserProfileModalProps {
  user: User;
  onClose: () => void;
  onStatusChange: (userId: string, status: User['status']) => void;
}

const UserProfileModal = ({ user, onClose, onStatusChange }: UserProfileModalProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'reports'>('overview');

  const mockActivities: UserActivity[] = [
    {
      id: '1',
      userId: user.id,
      type: 'login',
      description: 'Logged in from Kathmandu, Nepal',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      userId: user.id,
      type: 'booking',
      description: 'Booked Everest Base Camp Trek',
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: '3',
      userId: user.id,
      type: 'review',
      description: 'Left a review for Annapurna Circuit',
      timestamp: new Date(Date.now() - 172800000),
    },
  ];

  const mockReports: UserReport[] = [
    {
      id: '1',
      reportedUserId: user.id,
      reportedBy: 'admin@nepaltrek.com',
      reason: 'Inappropriate content',
      description: 'Posted offensive comments on trek review',
      status: 'resolved',
      createdAt: new Date(Date.now() - 604800000),
      resolvedAt: new Date(Date.now() - 518400000),
      resolvedBy: 'Admin User',
    },
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getActivityIcon = (type: UserActivity['type']) => {
    switch (type) {
      case 'login':
        return 'LogIn';
      case 'booking':
        return 'Calendar';
      case 'review':
        return 'Star';
      case 'story':
        return 'FileText';
      case 'report':
        return 'Flag';
      default:
        return 'Activity';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] bg-card border border-border rounded-lg shadow-elevation-4 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
            User Profile
          </h2>
          <Button variant="ghost" size="icon" iconName="X" onClick={onClose} />
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-muted mx-auto md:mx-0">
                <AppImage
                  src={user.avatar}
                  alt={user.avatarAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-3">
                  <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                    {user.name}
                  </h3>
                  {user.verificationStatus === 'verified' && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium caption px-2.5 py-1 rounded-full bg-success/10 text-success">
                      <Icon name="ShieldCheck" size={14} />
                      Verified
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground">
                    <Icon name="Mail" size={16} />
                    <span>{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground">
                      <Icon name="Phone" size={16} />
                      <span>{user.phone}</span>
                    </div>
                  )}
                  {user.location && (
                    <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground">
                      <Icon name="MapPin" size={16} />
                      <span>{user.location}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="inline-flex items-center text-xs font-medium caption px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                    {user.accountType.replace('_', ' ')}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-medium caption px-2.5 py-1 rounded-full ${
                      user.status === 'active' ?'bg-success/10 text-success'
                        : user.status === 'suspended' ?'bg-error/10 text-error' :'bg-muted text-muted-foreground'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {user.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl md:text-3xl font-heading font-bold text-foreground whitespace-nowrap mb-1">
                  {user.totalBookings}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground caption">Bookings</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl md:text-3xl font-heading font-bold text-foreground whitespace-nowrap mb-1">
                  {user.totalReviews}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground caption">Reviews</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl md:text-3xl font-heading font-bold text-foreground whitespace-nowrap mb-1">
                  {user.totalStories}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground caption">Stories</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl md:text-3xl font-heading font-bold text-foreground whitespace-nowrap mb-1">
                  {user.reportCount}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground caption">Reports</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-md transition-smooth ${
                  activeTab === 'overview' ?'bg-primary text-primary-foreground' :'text-foreground hover:bg-muted'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-md transition-smooth ${
                  activeTab === 'activity' ?'bg-primary text-primary-foreground' :'text-foreground hover:bg-muted'
                }`}
              >
                Activity
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-md transition-smooth ${
                  activeTab === 'reports' ?'bg-primary text-primary-foreground' :'text-foreground hover:bg-muted'
                }`}
              >
                Reports
              </button>
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="text-sm font-heading font-semibold text-foreground mb-2">
                    Account Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground caption">Registration Date:</span>
                      <span className="ml-2 text-foreground">
                        {formatDate(user.registrationDate)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground caption">Last Active:</span>
                      <span className="ml-2 text-foreground">
                        {formatDate(user.lastActive)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground caption">Activity Level:</span>
                      <span className="ml-2 text-foreground capitalize">
                        {user.activityLevel}
                      </span>
                    </div>
                    {user.joinedFrom && (
                      <div>
                        <span className="text-muted-foreground caption">Joined From:</span>
                        <span className="ml-2 text-foreground">{user.joinedFrom}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-3">
                {mockActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon
                        name={getActivityIcon(activity.type)}
                        size={18}
                        className="text-primary"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground mb-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground caption">
                        {formatDate(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="space-y-3">
                {mockReports.length > 0 ? (
                  mockReports.map((report) => (
                    <div
                      key={report.id}
                      className="p-4 bg-muted/50 rounded-lg border-l-4 border-error"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-heading font-semibold text-foreground">
                          {report.reason}
                        </h4>
                        <span
                          className={`text-xs font-medium caption px-2 py-1 rounded-full ${
                            report.status === 'resolved' ?'bg-success/10 text-success'
                              : report.status === 'investigating' ?'bg-warning/10 text-warning' :'bg-error/10 text-error'
                          }`}
                        >
                          {report.status}
                        </span>
                      </div>
                      <p className="text-sm text-foreground mb-2">{report.description}</p>
                      <div className="text-xs text-muted-foreground caption space-y-1">
                        <p>Reported: {formatDate(report.createdAt)}</p>
                        {report.resolvedAt && (
                          <p>Resolved: {formatDate(report.resolvedAt)}</p>
                        )}
                        {report.resolvedBy && <p>Resolved by: {report.resolvedBy}</p>}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground caption">
                    No reports found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 p-4 md:p-6 border-t border-border">
          <Button
            variant="outline"
            iconName="Mail"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Send Message
          </Button>
          {user.status === 'active' ? (
            <Button
              variant="destructive"
              iconName="UserX"
              iconPosition="left"
              onClick={() => onStatusChange(user.id, 'suspended')}
              className="w-full sm:w-auto"
            >
              Suspend Account
            </Button>
          ) : (
            <Button
              variant="success"
              iconName="UserCheck"
              iconPosition="left"
              onClick={() => onStatusChange(user.id, 'active')}
              className="w-full sm:w-auto"
            >
              Activate Account
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;