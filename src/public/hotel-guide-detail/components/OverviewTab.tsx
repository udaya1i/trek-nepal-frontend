import React from 'react';
import Icon from 'components/ui/AppIcon';

interface Feature {
  icon: string;
  label: string;
  value: string;
}

interface OverviewTabProps {
  description: string;
  features: Feature[];
  pricing: {
    perNight?: string;
    perDay?: string;
    seasonal?: string;
  };
  availability: string;
}

const OverviewTab = ({ description, features, pricing, availability }: OverviewTabProps) => {
  return (
    <div className="space-y-8">
      {/* Description */}
      <div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-4">About</h3>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{description}</p>
      </div>

      {/* Key Features */}
      <div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-4">Key Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-xl">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={feature.icon as any} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground">{feature.label}</div>
                <div className="text-sm text-muted-foreground">{feature.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-4">Pricing</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pricing.perNight && (
            <div className="p-4 bg-card rounded-xl">
              <div className="text-sm text-muted-foreground mb-1">Per Night</div>
              <div className="text-2xl font-semibold text-foreground">{pricing.perNight}</div>
            </div>
          )}
          {pricing.perDay && (
            <div className="p-4 bg-card rounded-xl">
              <div className="text-sm text-muted-foreground mb-1">Per Day</div>
              <div className="text-2xl font-semibold text-foreground">{pricing.perDay}</div>
            </div>
          )}
          {pricing.seasonal && (
            <div className="p-4 bg-card rounded-xl">
              <div className="text-sm text-muted-foreground mb-1">Seasonal Rate</div>
              <div className="text-sm font-medium text-foreground">{pricing.seasonal}</div>
            </div>
          )}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-4">Availability</h3>
        <div className="p-4 bg-success/10 text-success rounded-xl flex items-center gap-3">
          <Icon name="CheckCircleIcon" size={24} variant="solid" />
          <span className="font-medium">{availability}</span>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;