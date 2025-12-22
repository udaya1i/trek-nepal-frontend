import React from 'react';
import Icon from 'components/ui/AppIcon';

interface Amenity {
  name: string;
  icon: string;
  available: boolean;
}

interface AmenitiesTabProps {
  amenities: {
    basic: Amenity[];
    trekking: Amenity[];
    additional: Amenity[];
  };
}

const AmenitiesTab = ({ amenities }: AmenitiesTabProps) => {
  const renderAmenitySection = (title: string, items: Amenity[]) => (
    <div>
      <h3 className="text-xl font-heading font-semibold text-foreground mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((amenity, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 p-4 rounded-xl transition-smooth ${
              amenity.available
                ? 'bg-card hover:bg-muted' :'bg-muted/50 opacity-50'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                amenity.available
                  ? 'bg-primary/10 text-primary' :'bg-muted text-muted-foreground'
              }`}
            >
              <Icon name={amenity.icon as any} size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`font-medium ${amenity.available ? 'text-foreground' : 'text-muted-foreground'}`}>
                {amenity.name}
              </div>
            </div>
            {amenity.available ? (
              <Icon name="CheckCircleIcon" size={20} variant="solid" className="text-success flex-shrink-0" />
            ) : (
              <Icon name="XCircleIcon" size={20} variant="solid" className="text-muted-foreground flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {renderAmenitySection('Basic Amenities', amenities.basic)}
      {renderAmenitySection('Trekking Facilities', amenities.trekking)}
      {renderAmenitySection('Additional Services', amenities.additional)}
    </div>
  );
};

export default AmenitiesTab;