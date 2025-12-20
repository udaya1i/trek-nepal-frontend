

import React, { useState, useEffect } from 'react';
import Icon from 'components/ui/AppIcon';

interface BookingPanelProps {
  providerName: string;
  pricePerNight?: string;
  pricePerDay?: string;
  type: 'hotel' | 'guide';
}

const BookingPanel = ({ providerName, pricePerNight, pricePerDay, type }: BookingPanelProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const handleScroll = () => {
      setIsSticky(window.scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHydrated]);

  const handleBookNow = () => {
    console.log('Book now clicked for:', providerName);
  };

  const handleContactHost = () => {
    console.log('Contact host clicked for:', providerName);
  };

  if (!isHydrated) {
    return (
      <div className="hidden lg:block">
        <div className="p-6 bg-card border border-border rounded-xl shadow-warm-md">
          <div className="h-32 bg-muted animate-pulse rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Sticky Panel */}
      <div className="hidden lg:block">
        <div
          className={`p-6 bg-card border border-border rounded-xl shadow-warm-md transition-smooth ${
            isSticky ? 'sticky top-24' : ''
          }`}
        >
          <div className="space-y-6">
            {/* Price */}
            <div>
              <div className="text-3xl font-heading font-bold text-foreground mb-1">
                {pricePerNight || pricePerDay}
              </div>
              <div className="text-sm text-muted-foreground">
                {type === 'hotel' ? 'per night' : 'per day'}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleBookNow}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:scale-[0.97] transition-smooth flex items-center justify-center gap-2"
              >
                <Icon name="CheckCircleIcon" size={20} />
                <span>Book Now</span>
              </button>
              <button
                onClick={handleContactHost}
                className="w-full px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:scale-[0.97] transition-smooth flex items-center justify-center gap-2"
              >
                <Icon name="ChatBubbleLeftIcon" size={20} />
                <span>Contact {type === 'hotel' ? 'Hotel' : 'Guide'}</span>
              </button>
            </div>

            {/* Info */}
            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="CheckCircleIcon" size={16} className="text-success" />
                <span>Free cancellation up to 24 hours</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="ShieldCheckIcon" size={16} className="text-success" />
                <span>Verified provider</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-card border-t border-border shadow-warm-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="text-xl font-heading font-bold text-foreground">
              {pricePerNight || pricePerDay}
            </div>
            <div className="text-sm text-muted-foreground">
              {type === 'hotel' ? 'per night' : 'per day'}
            </div>
          </div>
          <button
            onClick={handleBookNow}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:scale-[0.97] transition-smooth"
          >
            Book Now
          </button>
        </div>
      </div>
    </>
  );
};

export default BookingPanel;