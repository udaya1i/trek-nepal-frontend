import React from 'react';

interface SafetyAlertIndicatorProps {
  count: number;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  className?: string;
}

const SafetyAlertIndicator = ({
  count,
  priority = 'medium',
  className = '',
}: SafetyAlertIndicatorProps) => {
  const getPriorityColor = () => {
    switch (priority) {
      case 'critical':
        return 'bg-error text-error-foreground';
      case 'high':
        return 'bg-warning text-warning-foreground';
      case 'medium':
        return 'bg-accent text-accent-foreground';
      case 'low':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (count === 0) return null;

  return (
    <span
      className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium rounded-full ${getPriorityColor()} ${className}`}
      title={`${count} ${priority} priority alert${count !== 1 ? 's' : ''}`}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
};

export default SafetyAlertIndicator;