import React from 'react';
import { DashboardMetric } from '../types';
import Icon from 'components/ui/AppIcon';

interface MetricCardProps {
  metric: DashboardMetric;
}

const MetricCard = ({ metric }: MetricCardProps) => {
  return (
    <div className="w-full min-w-0 bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8 shadow-elevation-2 hover:shadow-elevation-3 transition-smooth">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm md:text-base text-muted-foreground caption mb-2">
            {metric.label}
          </p>
          <p className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground whitespace-nowrap data-text">
            {metric.value.toLocaleString()}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                metric.changeType === 'increase' ?'bg-success/10 text-success' :'bg-error/10 text-error'
              }`}
            >
              <Icon
                name={metric.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'}
                size={14}
              />
              <span className="whitespace-nowrap">{Math.abs(metric.change)}%</span>
            </div>
            <span className="text-xs text-muted-foreground caption">vs last month</span>
          </div>
        </div>
        <div
          className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg flex items-center justify-center ${metric.color}`}
        >
          <Icon name={metric.icon} size={24} className="md:w-7 md:h-7 lg:w-8 lg:h-8" />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;