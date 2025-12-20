import React, { useState } from 'react';
import BookingPanel from './BookingPanel';
import OverviewTab from './OverviewTab';
import AmenitiesTab from './AmenitiesTab';
import LocationTab from './LocationTab';
import ReviewsTab from './ReviewsTab';
import ImageGallery from './ImageGallery';
import ProviderHeader from './ProviderHeader';
import ContactButtons from './ContactButtons';
import TabNavigation from './TabNavigation';

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

interface Feature {
  icon: string;
  label: string;
  value: string;
}

interface Amenity {
  name: string;
  icon: string;
  available: boolean;
}

interface Landmark {
  name: string;
  distance: string;
  type: 'trek' | 'facility' | 'transport';
}

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  userAvatarAlt: string;
  rating: number;
  date: string;
  comment: string;
  isVerified: boolean;
  photos?: Array<{ url: string; alt: string }>;
}

interface HotelGuideDetailData {
  name: string;
  type: 'hotel' | 'guide';
  isVerified: boolean;
  location: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  images: GalleryImage[];
  contactInfo: {
    phone: string;
    whatsapp?: string;
    viber?: string;
    email?: string;
  };
  description: string;
  features: Feature[];
  pricing: {
    perNight?: string;
    perDay?: string;
    seasonal?: string;
  };
  availability: string;
  amenities: {
    basic: Amenity[];
    trekking: Amenity[];
    additional: Amenity[];
  };
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  nearbyLandmarks: Landmark[];
  overallRating: number;
  totalReviews: number;
  ratingCategories: Array<{ label: string; value: number }>;
  reviews: Review[];
}

interface HotelGuideDetailInteractiveProps {
  data: any;
}

const HotelGuideDetailInteractive = ({ data }: HotelGuideDetailInteractiveProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'InformationCircleIcon' },
    { id: 'amenities', label: 'Amenities', icon: 'SparklesIcon' },
    { id: 'location', label: 'Location', icon: 'MapPinIcon' },
    { id: 'reviews', label: 'Reviews', icon: 'StarIcon' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewTab
            description={data.description}
            features={data.features}
            pricing={data.pricing}
            availability={data.availability}
          />
        );
      case 'amenities':
        return <AmenitiesTab amenities={data.amenities} />;
      case 'location':
        return (
          <LocationTab
            address={data.address}
            coordinates={data.coordinates}
            nearbyLandmarks={data.nearbyLandmarks}
          />
        );
      case 'reviews':
        return (
          <ReviewsTab
            overallRating={data.overallRating}
            totalReviews={data.totalReviews}
            ratingCategories={data.ratingCategories}
            reviews={data.reviews}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      <div className="mx-4 lg:mx-16 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <ImageGallery images={data.images} providerName={data.name} />

            {/* Provider Header */}
            <ProviderHeader
              name={data.name}
              type={data.type}
              isVerified={data.isVerified}
              location={data.location}
              rating={data.rating}
              reviewCount={data.reviewCount}
              priceRange={data.priceRange}
            />

            {/* Contact Buttons */}
            <ContactButtons contactInfo={data.contactInfo} providerName={data.name} />

            {/* Tabs */}
            <div className="bg-card rounded-xl shadow-warm-sm overflow-hidden">
              <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
              <div className="p-6">{renderTabContent()}</div>
            </div>
          </div>

          {/* Booking Panel */}
          <div className="lg:col-span-1">
            <BookingPanel
              providerName={data.name}
              pricePerNight={data.pricing.perNight}
              pricePerDay={data.pricing.perDay}
              type={data.type}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelGuideDetailInteractive;