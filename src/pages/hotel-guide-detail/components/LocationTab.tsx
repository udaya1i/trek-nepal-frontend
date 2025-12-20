import React from 'react';
import Icon from 'components/ui/AppIcon';

interface Landmark {
  name: string;
  distance: string;
  type: 'trek' | 'facility' | 'transport';
}

interface LocationTabProps {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  nearbyLandmarks: Landmark[];
}

const LocationTab = ({ address, coordinates, nearbyLandmarks }: LocationTabProps) => {
  const getLandmarkIcon = (type: Landmark['type']) => {
    switch (type) {
      case 'trek':
        return 'MapIcon';
      case 'facility':
        return 'BuildingOfficeIcon';
      case 'transport':
        return 'TruckIcon';
      default:
        return 'MapPinIcon';
    }
  };

  return (
    <div className="space-y-8">
      {/* Address */}
      <div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-4">Address</h3>
        <div className="flex items-start gap-3 p-4 bg-card rounded-xl">
          <Icon name="MapPinIcon" size={24} className="text-primary flex-shrink-0 mt-1" />
          <div>
            <p className="text-foreground font-medium mb-1">{address}</p>
            <p className="text-sm text-muted-foreground">
              Coordinates: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
            </p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-4">Location Map</h3>
        <div className="w-full h-[400px] bg-muted rounded-xl overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title={address}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=14&output=embed`}
            className="border-0"
          />
        </div>
      </div>

      {/* Nearby Landmarks */}
      <div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-4">Nearby Landmarks</h3>
        <div className="space-y-3">
          {nearbyLandmarks.map((landmark, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-card rounded-xl hover:bg-muted transition-smooth">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={getLandmarkIcon(landmark.type) as any} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground">{landmark.name}</div>
                <div className="text-sm text-muted-foreground">{landmark.distance}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationTab;