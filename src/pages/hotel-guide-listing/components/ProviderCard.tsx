'use client';

import React from 'react';
 import AppImage from 'components/ui/AppImage';
import Icon from 'components/ui/AppIcon';
import { Link } from 'react-router-dom';

export interface Provider {
  id: string;
  name: string;
  type: 'hotel' | 'guide';
  location: string;
  priceRange: string;
  rating: number;
  reviewCount: number;
  image: string;
  alt: string;
  verified: boolean;
  amenities: string[];
  whatsapp?: string;
  viber?: string;
}

interface ProviderCardProps {
  provider: Provider;
}

const ProviderCard = ({ provider }: ProviderCardProps) => {
  const handleContactClick = (type: 'whatsapp' | 'viber', number?: string) => {
    if (!number) return;
    const url = type === 'whatsapp' 
      ? `https://wa.me/${number}` 
      : `viber://chat?number=${number}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-warm hover:shadow-warm-md transition-smooth group">
      {/* Image Section */}
      <Link to="/hotel-guide-detail" className="block relative h-56 overflow-hidden">
        <AppImage
          src={provider.image}
          alt={provider.alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500"
        />
        {provider.verified && (
          <div className="absolute top-4 right-4 bg-success text-success-foreground px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-warm">
            <Icon name="CheckBadgeIcon" size={16} variant="solid" />
            <span className="text-xs font-medium">Verified</span>
          </div>
        )}
        <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-medium capitalize">
          {provider.type}
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-5">
        <Link to="/hotel-guide-detail" className="block mb-3">
          <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-smooth line-clamp-1">
            {provider.name}
          </h3>
        </Link>

        {/* Location & Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="MapPinIcon" size={16} />
            <span className="text-sm">{provider.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="StarIcon" size={16} variant="solid" className="text-warning" />
            <span className="data-text text-sm font-medium text-foreground">
              {provider.rating.toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground">({provider.reviewCount})</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {provider.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="px-2.5 py-1 bg-muted text-muted-foreground text-xs rounded-lg"
            >
              {amenity}
            </span>
          ))}
          {provider.amenities.length > 3 && (
            <span className="px-2.5 py-1 bg-muted text-muted-foreground text-xs rounded-lg">
              +{provider.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Price & Contact Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-sm text-muted-foreground">From</span>
            <div className="data-text font-semibold text-lg text-foreground">
              {provider.priceRange}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {provider.whatsapp && (
              <button
                onClick={() => handleContactClick('whatsapp', provider.whatsapp)}
                className="w-10 h-10 bg-success text-success-foreground rounded-lg flex items-center justify-center hover:scale-105 transition-smooth"
                aria-label="Contact via WhatsApp"
              >
                <Icon name="ChatBubbleLeftRightIcon" size={20} />
              </button>
            )}
            {provider.viber && (
              <button
                onClick={() => handleContactClick('viber', provider.viber)}
                className="w-10 h-10 bg-secondary text-secondary-foreground rounded-lg flex items-center justify-center hover:scale-105 transition-smooth"
                aria-label="Contact via Viber"
              >
                <Icon name="PhoneIcon" size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;