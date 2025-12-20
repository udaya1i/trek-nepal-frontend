'use client';

import React, { useState } from 'react';
import { Provider } from './ProviderCard';
import Icon from 'components/ui/AppIcon';

interface MapViewProps {
  providers: Provider[];
}

const MapView = ({ providers }: MapViewProps) => {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  // Mock coordinates for demonstration
  const providerLocations = providers.map((provider, index) => ({
    ...provider,
    lat: 27.7 + (index * 0.05),
    lng: 85.3 + (index * 0.05),
  }));

  return (
    <div className="relative w-full h-[600px] bg-muted rounded-xl overflow-hidden">
      {/* Google Maps Iframe */}
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title="Service Providers Map"
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps?q=27.7172,85.3240&z=12&output=embed"
        className="w-full h-full"
      />

      {/* Provider List Overlay */}
      <div className="absolute top-4 left-4 right-4 md:right-auto md:w-80 bg-card border border-border rounded-xl shadow-warm-lg max-h-[calc(100%-2rem)] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4">
          <h3 className="font-heading font-semibold text-lg text-foreground">
            {providers.length} Providers
          </h3>
        </div>
        <div className="divide-y divide-border">
          {providerLocations.map((provider) => (
            <button
              key={provider.id}
              onClick={() => setSelectedProvider(provider)}
              className={`w-full p-4 text-left hover:bg-muted transition-smooth ${
                selectedProvider?.id === provider.id ? 'bg-muted' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center flex-shrink-0 font-semibold">
                  {provider.type === 'hotel' ? 'H' : 'G'}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate mb-1">
                    {provider.name}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Icon name="MapPinIcon" size={14} />
                    <span className="truncate">{provider.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Icon name="StarIcon" size={14} variant="solid" className="text-warning" />
                      <span className="data-text text-sm font-medium text-foreground">
                        {provider.rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="data-text text-sm font-semibold text-foreground">
                      {provider.priceRange}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Provider Info Card */}
      {selectedProvider && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md bg-card border border-border rounded-xl shadow-warm-lg p-4">
          <button
            onClick={() => setSelectedProvider(null)}
            className="absolute top-2 right-2 p-1.5 rounded-lg hover:bg-muted transition-smooth"
            aria-label="Close"
          >
            <Icon name="XMarkIcon" size={20} />
          </button>
          <div className="pr-8">
            <h4 className="font-heading font-semibold text-lg text-foreground mb-2">
              {selectedProvider.name}
            </h4>
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <Icon name="MapPinIcon" size={16} />
              <span className="text-sm">{selectedProvider.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Icon name="StarIcon" size={16} variant="solid" className="text-warning" />
                <span className="data-text text-sm font-medium text-foreground">
                  {selectedProvider.rating.toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">
                  ({selectedProvider.reviewCount})
                </span>
              </div>
              <span className="data-text font-semibold text-lg text-foreground">
                {selectedProvider.priceRange}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;