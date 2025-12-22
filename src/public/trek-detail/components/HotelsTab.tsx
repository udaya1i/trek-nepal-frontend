import { useState } from "react";
import Image from "../../../components/ui/AppImage";
import Icon from "../../../components/ui/AppIcon";
import Button from "../../../components/ui/Button";
import { Hotel } from "../types";

interface HotelsTabProps {
  hotels: Hotel[];
}

const HotelsTab = ({ hotels }: HotelsTabProps) => {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const handleContact = (type: "phone" | "whatsapp" | "viber", contact: string) => {
    const urls = {
      phone: `tel:${contact}`,
      whatsapp: `https://wa.me/${contact.replace(/[^0-9]/g, "")}`,
      viber: `viber://chat?number=${contact.replace(/[^0-9]/g, "")}`,
    };
    window.open(urls[type], "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Info" size={16} />
          <p>
            These accommodations are located along the trek route. Contact them directly for
            bookings and availability.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={hotel.image}
                alt={hotel.alt}
                className="w-full h-full object-cover"
              />
              {hotel.verified && (
                <div className="absolute top-3 right-3 bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Icon name="BadgeCheck" size={14} />
                  Verified
                </div>
              )}
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground mb-1">{hotel.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Icon name="MapPin" size={14} />
                    {hotel.location}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-warning/10 px-2 py-1 rounded">
                  <Icon name="Star" size={14} className="text-warning fill-warning" />
                  <span className="text-sm font-semibold text-foreground">{hotel.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium text-primary">{hotel.priceRange}</span>
                <span className="text-xs text-muted-foreground">per night</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {hotel.amenities.slice(0, 4).map((amenity, index) => (
                  <span
                    key={index}
                    className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                  >
                    {amenity}
                  </span>
                ))}
                {hotel.amenities.length > 4 && (
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                    +{hotel.amenities.length - 4} more
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="Phone"
                  iconPosition="left"
                  onClick={() => handleContact("phone", hotel.contact.phone)}
                >
                  Call
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="MessageCircle"
                  iconPosition="left"
                  onClick={() => handleContact("whatsapp", hotel.contact.whatsapp)}
                >
                  WhatsApp
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setSelectedHotel(hotel)}
                >
                  Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedHotel && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">{selectedHotel.name}</h2>
              <button
                onClick={() => setSelectedHotel(null)}
                className="w-8 h-8 hover:bg-muted rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="Close"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="p-6">
              <Image
                src={selectedHotel.image}
                alt={selectedHotel.alt}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedHotel.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="text-sm bg-muted text-foreground px-3 py-1.5 rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Contact Options</h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      fullWidth
                      iconName="Phone"
                      iconPosition="left"
                      onClick={() => handleContact("phone", selectedHotel.contact.phone)}
                    >
                      {selectedHotel.contact.phone}
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      iconName="MessageCircle"
                      iconPosition="left"
                      onClick={() => handleContact("whatsapp", selectedHotel.contact.whatsapp)}
                    >
                      WhatsApp: {selectedHotel.contact.whatsapp}
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      iconName="Phone"
                      iconPosition="left"
                      onClick={() => handleContact("viber", selectedHotel.contact.viber)}
                    >
                      Viber: {selectedHotel.contact.viber}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelsTab;