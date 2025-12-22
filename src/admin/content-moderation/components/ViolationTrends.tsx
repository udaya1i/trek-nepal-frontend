import React from 'react';
import { GuidelineViolation } from '../types';
import Icon from 'components/ui/AppIcon';

interface ViolationTrendsProps {
  violations: GuidelineViolation[];
}

const ViolationTrends = ({ violations }: ViolationTrendsProps) => {
  const getViolationIcon = (type: string) => {
    switch (type) {
      case 'spam':
        return 'Ban';
      case 'inappropriate':
        return 'AlertCircle';
      case 'copyright':
        return 'Copyright';
      case 'misleading':
        return 'AlertTriangle';
      default:
        return 'Flag';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-error';
      case 'down':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-5">
      <div className="flex items-center gap-3 mb-5">
        <Icon name="TrendingUp" size={20} className="text-muted-foreground" />
        <h2 className="text-base md:text-lg font-heading font-semibold text-foreground">
          Violation Trends
        </h2>
      </div>

      <div className="space-y-3">
        {violations.map((violation) => (
          <div
            key={violation.type}
            className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-smooth"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Icon
                  name={getViolationIcon(violation.type)}
                  size={18}
                  className="text-foreground"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground capitalize">
                  {violation.type}
                </p>
                <p className="text-xs text-muted-foreground caption">
                  {violation.count} reports
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                {violation.percentage}%
              </span>
              <Icon
                name={getTrendIcon(violation.trend)}
                size={16}
                className={getTrendColor(violation.trend)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-sm text-accent hover:text-accent/80 font-medium transition-smooth">
          View Detailed Report
        </button>
      </div>
    </div>
  );
};

export default ViolationTrends;