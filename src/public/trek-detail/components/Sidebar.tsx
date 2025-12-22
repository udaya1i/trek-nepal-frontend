import { useState } from "react";
import Image from "../../../components/ui/AppImage";
import Icon from "../../../components/ui/AppIcon";
import Button from "../../../components/ui/Button";
import { Trek } from "../types";

interface SidebarProps {
  trek: Trek;
  onBookmark: () => void;
  onShare: () => void;
}

const Sidebar = ({ trek, onBookmark, onShare }: SidebarProps) => {
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleBookNow = () => {
    setShowBookingForm(true);
  };

  const handleSimilarTrekClick = (trekId: string) => {
    window.location.href = `/trek-detail?id=${trekId}`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon name="Star" size={20} className="text-warning fill-warning" />
            <span className="text-2xl font-bold text-foreground">{trek.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({trek.totalReviews} reviews)
            </span>
          </div>
          <button
            onClick={onBookmark}
            className="w-10 h-10 hover:bg-muted rounded-full flex items-center justify-center transition-colors duration-200"
            aria-label={trek.bookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Icon
              name="Bookmark"
              size={20}
              className={trek.bookmarked ? "text-primary fill-primary" : "text-muted-foreground"}
            />
          </button>
        </div>

        <Button
          variant="default"
          fullWidth
          size="lg"
          iconName="Calendar"
          iconPosition="left"
          onClick={handleBookNow}
          className="mb-3"
        >
          Book This Trek
        </Button>

        <Button
          variant="outline"
          fullWidth
          iconName="Share2"
          iconPosition="left"
          onClick={onShare}
        >
          Share Trek
        </Button>

        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-semibold text-foreground mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors duration-200 text-left">
              <Icon name="Download" size={18} className="text-primary" />
              <span className="text-sm text-foreground">Download Itinerary</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors duration-200 text-left">
              <Icon name="MessageCircle" size={18} className="text-primary" />
              <span className="text-sm text-foreground">Ask a Question</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors duration-200 text-left">
              <Icon name="MapPin" size={18} className="text-primary" />
              <span className="text-sm text-foreground">View on Map</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Compass" size={20} className="text-primary" />
          Similar Treks
        </h3>
        <div className="space-y-4">
          {trek.similarTreks.map((similarTrek) => (
            <button
              key={similarTrek.id}
              onClick={() => handleSimilarTrekClick(similarTrek.id)}
              className="w-full flex gap-3 hover:bg-muted p-2 rounded-lg transition-colors duration-200 text-left"
            >
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={similarTrek.image}
                  alt={similarTrek.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground mb-1 line-clamp-1">
                  {similarTrek.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={12} />
                    {similarTrek.duration}
                  </span>
                  <span>•</span>
                  <span>{similarTrek.difficulty}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={12} className="text-warning fill-warning" />
                  <span className="text-xs font-medium text-foreground">
                    {similarTrek.rating}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {showBookingForm && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Book Your Trek</h2>
              <button
                onClick={() => setShowBookingForm(false)}
                className="w-8 h-8 hover:bg-muted rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="Close"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-6">
                Fill in your details and we'll get back to you with booking confirmation and
                further information.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="+977 9800000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Preferred Start Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Number of People *
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                    placeholder="Any special requirements or questions..."
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setShowBookingForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="default" fullWidth>
                    Submit Booking
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;