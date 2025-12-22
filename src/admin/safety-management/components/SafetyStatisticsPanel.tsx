import React from 'react';
import { SafetyStatistics } from '../types';
import Icon from 'components/ui/AppIcon';

interface SafetyStatisticsPanelProps {
  statistics: SafetyStatistics;
}

const SafetyStatisticsPanel = ({ statistics }: SafetyStatisticsPanelProps) => {
  const stats = [
    {
      label: 'Active Alerts',
      value: statistics.totalActiveAlerts,
      icon: 'AlertTriangle',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      label: 'Critical Alerts',
      value: statistics.criticalAlerts,
      icon: 'AlertOctagon',
      color: 'text-error',
      bgColor: 'bg-error/10',
    },
    {
      label: 'Affected Trails',
      value: statistics.affectedTrails,
      icon: 'Mountain',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      label: 'Affected Users',
      value: statistics.affectedUsers,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Resolved Today',
      value: statistics.resolvedToday,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      label: 'Avg Response Time',
      value: statistics.averageResponseTime,
      icon: 'Clock',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 md:p-6 hover:shadow-elevation-2 transition-smooth"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground caption mb-2">{stat.label}</p>
              <p className="text-2xl md:text-3xl font-heading font-semibold text-foreground whitespace-nowrap">
                {stat.value}
              </p>
            </div>
            <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <Icon name={stat.icon} size={20} className={stat.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SafetyStatisticsPanel;