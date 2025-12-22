import React from 'react';
import Button from '../../../components/ui/Button';
import { User } from '../types';
import AppImage from 'components/ui/AppImage';
import Icon from 'components/ui/AppIcon';

interface UserTableRowProps {
  user: User;
  isSelected: boolean;
  onSelect: (userId: string) => void;
  onViewProfile: (user: User) => void;
  onChangeStatus: (userId: string, status: User['status']) => void;
}

const UserTableRow = ({
  user,
  isSelected,
  onSelect,
  onViewProfile,
  onChangeStatus,
}: UserTableRowProps) => {
  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'inactive':
        return 'text-muted-foreground bg-muted';
      case 'suspended':
        return 'text-error bg-error/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getActivityColor = (level: User['activityLevel']) => {
    switch (level) {
      case 'high':
        return 'text-success';
      case 'medium':
        return 'text-accent';
      case 'low':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const getTimeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return formatDate(date);
  };

  return (
    <>
      <tr className="hidden lg:table-row border-b border-border hover:bg-muted/50 transition-smooth">
        <td className="p-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(user.id)}
            className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
          />
        </td>
        <td className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden bg-muted">
              <AppImage
                src={user.avatar}
                alt={user.avatarAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground line-clamp-1">
                {user.name}
              </p>
              <p className="text-xs text-muted-foreground caption line-clamp-1">
                {user.email}
              </p>
            </div>
          </div>
        </td>
        <td className="p-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium caption px-2.5 py-1 rounded-full bg-primary/10 text-primary">
            {user.accountType.replace('_', ' ')}
          </span>
        </td>
        <td className="p-4">
          <p className="text-sm text-foreground">{formatDate(user.registrationDate)}</p>
        </td>
        <td className="p-4">
          <p className="text-sm text-muted-foreground">{getTimeSince(user.lastActive)}</p>
        </td>
        <td className="p-4">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium caption px-2.5 py-1 rounded-full ${getStatusColor(
              user.status
            )}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {user.status}
          </span>
        </td>
        <td className="p-4">
          <div className="flex items-center gap-1">
            <Icon
              name="Activity"
              size={14}
              className={getActivityColor(user.activityLevel)}
            />
            <span className={`text-xs caption ${getActivityColor(user.activityLevel)}`}>
              {user.activityLevel}
            </span>
          </div>
        </td>
        <td className="p-4">
          {user.verificationStatus === 'verified' ? (
            <Icon name="ShieldCheck" size={18} className="text-success" />
          ) : user.verificationStatus === 'pending' ? (
            <Icon name="Clock" size={18} className="text-warning" />
          ) : (
            <Icon name="Shield" size={18} className="text-muted-foreground" />
          )}
        </td>
        <td className="p-4">
          {user.reportCount > 0 && (
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium rounded-full bg-error text-error-foreground">
              {user.reportCount}
            </span>
          )}
        </td>
        <td className="p-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              iconName="Eye"
              onClick={() => onViewProfile(user)}
              title="View Profile"
            />
            <Button
              variant="ghost"
              size="icon"
              iconName="MoreVertical"
              title="More Actions"
            />
          </div>
        </td>
      </tr>

      <div className="lg:hidden w-full min-w-0 bg-card border border-border rounded-lg p-4 mb-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect(user.id)}
              className="flex-shrink-0 w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
            />
            <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-muted">
              <AppImage
                src={user.avatar}
                alt={user.avatarAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground line-clamp-1">
                {user.name}
              </p>
              <p className="text-xs text-muted-foreground caption line-clamp-1">
                {user.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {user.verificationStatus === 'verified' && (
              <Icon name="ShieldCheck" size={16} className="text-success" />
            )}
            {user.reportCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium rounded-full bg-error text-error-foreground">
                {user.reportCount}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <p className="text-xs text-muted-foreground caption mb-1">Account Type</p>
            <span className="inline-flex items-center text-xs font-medium caption px-2 py-1 rounded-full bg-primary/10 text-primary">
              {user.accountType.replace('_', ' ')}
            </span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground caption mb-1">Status</p>
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-medium caption px-2 py-1 rounded-full ${getStatusColor(
                user.status
              )}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {user.status}
            </span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground caption mb-1">Registered</p>
            <p className="text-xs text-foreground">{formatDate(user.registrationDate)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground caption mb-1">Last Active</p>
            <p className="text-xs text-foreground">{getTimeSince(user.lastActive)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-1">
            <Icon
              name="Activity"
              size={14}
              className={getActivityColor(user.activityLevel)}
            />
            <span className={`text-xs caption ${getActivityColor(user.activityLevel)}`}>
              {user.activityLevel} activity
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Eye"
              onClick={() => onViewProfile(user)}
            >
              View
            </Button>
            <Button variant="ghost" size="icon" iconName="MoreVertical" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTableRow;