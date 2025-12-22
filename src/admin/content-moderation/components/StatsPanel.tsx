import React from 'react';
import Icon from 'components/ui/AppIcon';
import { ModerationStats } from '../types';

interface StatsPanelProps {
  stats: ModerationStats;
}

const StatsPanel = ({ stats }: StatsPanelProps) => {
  const statItems = [
    {
      label: 'Pending Review',
      value: stats.totalPending,
      icon: 'Clock',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      label: 'Approved',
      value: stats.totalApproved,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      label: 'Rejected',
      value: stats.totalRejected,
      icon: 'XCircle',
      color: 'text-error',
      bgColor: 'bg-error/10',
    },
    {
      label: 'Flagged',
      value: stats.totalFlagged,
      icon: 'Flag',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-5">
      <div className="flex items-center gap-3 mb-5">
        <Icon name="BarChart3" size={20} className="text-muted-foreground" />
        <h2 className="text-base md:text-lg font-heading font-semibold text-foreground">
          Moderation Statistics
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-5">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="p-4 rounded-lg border border-border hover:shadow-elevation-1 transition-smooth"
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-lg ${item.bgColor}`}
              >
                <Icon name={item.icon} size={20} className={item.color} />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-heading font-bold text-foreground whitespace-nowrap">
              {item.value.toLocaleString()}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground caption mt-1">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground caption">
            Avg. Review Time
          </span>
          <span className="text-sm font-medium text-foreground">
            {stats.avgReviewTime}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground caption">
            Reviewed Today
          </span>
          <span className="text-sm font-medium text-foreground">
            {stats.todayReviewed}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;