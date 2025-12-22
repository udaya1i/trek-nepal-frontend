import React from 'react';
import Icon from 'components/ui/AppIcon';

interface ProviderHeaderProps {
  name: string;
  type: 'hotel' | 'guide';
  isVerified: boolean;
  location: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
}

const ProviderHeader = ({
  name,
  type,
  isVerified,
  location,
  rating,
  reviewCount,
  priceRange,
}: ProviderHeaderProps) => {
  return (
    <div className="space-y-4">
      {/* Name and Verification */}
      <div className="flex items-start gap-3">
        <h1 className="text-3xl md:text-4xl font-heading font-semibold text-foreground flex-1">
          {name}
        </h1>
        {isVerified && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 text-success rounded-lg flex-shrink-0">
            <Icon name="CheckBadgeIcon" size={20} variant="solid" />
            <span className="text-sm font-medium">Verified</span>
          </div>
        )}
      </div>

      {/* Type Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg">
        <Icon name={type === 'hotel' ? 'BuildingOfficeIcon' : 'UserIcon'} size={16} />
        <span className="text-sm font-medium capitalize">{type}</span>
      </div>

      {/* Location and Rating */}
      <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
        <div className="flex items-center gap-2">
          <Icon name="MapPinIcon" size={20} />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="StarIcon" size={20} variant="solid" className="text-warning" />
          <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
          <span>({reviewCount} reviews)</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="CurrencyDollarIcon" size={20} />
          <span className="font-medium text-foreground">{priceRange}</span>
        </div>
      </div>
    </div>
  );
};

export default ProviderHeader;