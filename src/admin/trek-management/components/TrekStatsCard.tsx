import React from 'react';
import { TrekStats } from '../types';
import Icon from 'components/ui/AppIcon';

interface TrekStatsCardProps {
  stats: TrekStats;
}

const TrekStatsCard = ({ stats }: TrekStatsCardProps) => {
  const statItems = [
    {
      label: 'Total Treks',
      value: stats.total,
      icon: 'Mountain',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Published',
      value: stats.published,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      label: 'Under Review',
      value: stats.underReview,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      label: 'Featured',
      value: stats.featured,
      icon: 'Star',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {statItems.map((item) => (
        <div
          key={item.label}
          className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-smooth"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground caption mb-2">
                {item.label}
              </p>
              <p className="text-3xl md:text-4xl font-heading font-bold text-foreground whitespace-nowrap">
                {item.value}
              </p>
            </div>
            <div
              className={`flex-shrink-0 w-12 h-12 rounded-lg ${item.bgColor} flex items-center justify-center`}
            >
              <Icon name={item.icon} size={24} className={item.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrekStatsCard;