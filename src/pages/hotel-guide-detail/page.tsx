import type { Metadata } from 'next';
import Header from 'components/common/Header';
import BreadcrumbTrail from 'components/common/BreadcrumbTrail';
import HotelGuideDetailInteractive from './components/HotelGuideDetailInteractive';

export const metadata: Metadata = {
  title: 'Mountain View Lodge - Nepal Trek Explorer',
  description: 'Discover comprehensive information about Mountain View Lodge in Namche Bazaar including amenities, pricing, location, and verified guest reviews for your Everest Base Camp trek.'
};

export default function HotelGuideDetailPage() {
  const mockData = {
    name: 'Mountain View Lodge',
    type: 'hotel' as const,
    isVerified: true,
    location: 'Namche Bazaar, Solukhumbu',
    rating: 4.8,
    reviewCount: 127,
    priceRange: '$25-45',
    images: [
    {
      id: '1',
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_13a50aea0-1765004605374.png",
      alt: 'Exterior view of Mountain View Lodge with traditional Nepali architecture and snow-capped mountains in background'
    },
    {
      id: '2',
      url: "https://images.unsplash.com/photo-1667514622688-acd47ea64611",
      alt: 'Cozy lodge common area with wooden furniture, warm lighting, and mountain view windows'
    },
    {
      id: '3',
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_135814959-1765833407448.png",
      alt: 'Clean double bedroom with comfortable beds, wooden floors, and traditional Nepali decor'
    },
    {
      id: '4',
      url: "https://images.unsplash.com/photo-1713212804119-04d3df44d743",
      alt: 'Dining area with long wooden tables and panoramic mountain views through large windows'
    },
    {
      id: '5',
      url: "https://images.unsplash.com/photo-1664911327167-9b8395331be6",
      alt: 'Outdoor terrace with seating area overlooking Himalayan peaks during sunset'
    },
    {
      id: '6',
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1491541f0-1765777699702.png",
      alt: 'Modern bathroom with hot shower facilities and clean white tiles'
    },
    {
      id: '7',
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1471254fc-1765660846472.png",
      alt: 'Traditional Nepali breakfast spread with dal bhat, eggs, and fresh vegetables'
    },
    {
      id: '8',
      url: "https://images.unsplash.com/photo-1574229478164-c5165705b932",
      alt: 'Comfortable lounge area with fireplace, cushioned seating, and mountain photography on walls'
    }],

    contactInfo: {
      phone: '+977-9841234567',
      whatsapp: '9779841234567',
      viber: '9779841234567',
      email: 'info@mountainviewlodge.com'
    },
    description: `Welcome to Mountain View Lodge, your home away from home in the heart of Namche Bazaar. Situated at 3,440 meters, our family-run lodge offers stunning panoramic views of Mount Everest, Lhotse, and Ama Dablam.\n\nWe pride ourselves on providing warm Sherpa hospitality combined with modern amenities to ensure your comfort during your Everest Base Camp trek. Our experienced staff understands the needs of trekkers and is always ready to assist with route planning, weather updates, and local insights.\n\nThe lodge features comfortable rooms with thick mattresses and warm blankets, essential for the high-altitude climate. Our dining area serves a variety of international and traditional Nepali cuisine, prepared fresh daily by our skilled kitchen team.\n\nWe are committed to sustainable tourism practices and work closely with the local community to preserve the natural beauty of the Khumbu region.`,
    features: [
    { icon: 'HomeIcon', label: 'Accommodation', value: '12 rooms available' },
    { icon: 'UserGroupIcon', label: 'Capacity', value: 'Up to 30 guests' },
    { icon: 'ClockIcon', label: 'Check-in', value: '12:00 PM onwards' },
    { icon: 'MapIcon', label: 'Trek Access', value: '5 min to EBC trail' },
    { icon: 'WifiIcon', label: 'Internet', value: 'Free WiFi available' },
    { icon: 'FireIcon', label: 'Heating', value: 'Central heating system' }],

    pricing: {
      perNight: '$35',
      seasonal: 'Peak season (Oct-Nov, Mar-May): $45/night'
    },
    availability: 'Available year-round • Book 2 weeks in advance during peak season',
    amenities: {
      basic: [
      { name: 'Hot Shower', icon: 'FireIcon', available: true },
      { name: 'WiFi Internet', icon: 'WifiIcon', available: true },
      { name: 'Electricity', icon: 'BoltIcon', available: true },
      { name: 'Heating', icon: 'FireIcon', available: true },
      { name: 'Laundry Service', icon: 'SparklesIcon', available: true },
      { name: 'Room Service', icon: 'BellAlertIcon', available: false }],

      trekking: [
      { name: 'Gear Storage', icon: 'ArchiveBoxIcon', available: true },
      { name: 'Drying Room', icon: 'SunIcon', available: true },
      { name: 'Porter Service', icon: 'UserIcon', available: true },
      { name: 'Trek Information', icon: 'MapIcon', available: true },
      { name: 'Emergency Kit', icon: 'ShieldCheckIcon', available: true },
      { name: 'Oxygen Supply', icon: 'HeartIcon', available: true }],

      additional: [
      { name: 'Restaurant', icon: 'BuildingStorefrontIcon', available: true },
      { name: 'Bar/Lounge', icon: 'CakeIcon', available: true },
      { name: 'Library', icon: 'BookOpenIcon', available: true },
      { name: 'Garden/Terrace', icon: 'HomeModernIcon', available: true },
      { name: 'Parking', icon: 'TruckIcon', available: false },
      { name: 'Airport Pickup', icon: 'TruckIcon', available: true }]

    },
    address: 'Namche Bazaar, Khumjung Ward No. 1, Solukhumbu District, Koshi Province, Nepal',
    coordinates: {
      lat: 27.8047,
      lng: 86.7132
    },
    nearbyLandmarks: [
    { name: 'Everest Base Camp Trailhead', distance: '400m (5 min walk)', type: 'trek' as const },
    { name: 'Namche Bazaar Market', distance: '200m (3 min walk)', type: 'facility' as const },
    { name: 'Sagarmatha National Park Office', distance: '150m (2 min walk)', type: 'facility' as const },
    { name: 'Helicopter Pad', distance: '1.2km (15 min walk)', type: 'transport' as const },
    { name: 'Khumjung Monastery', distance: '2.5km (30 min walk)', type: 'facility' as const },
    { name: 'Everest View Hotel', distance: '3km (1 hour walk)', type: 'trek' as const }],

    overallRating: 4.8,
    totalReviews: 127,
    ratingCategories: [
    { label: 'Cleanliness', value: 4.9 },
    { label: 'Hospitality', value: 5.0 },
    { label: 'Location', value: 4.8 },
    { label: 'Value for Money', value: 4.6 },
    { label: 'Facilities', value: 4.7 }],

    reviews: [
    {
      id: '1',
      userName: 'Sarah Johnson',
      userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e6e945e2-1764866141793.png",
      userAvatarAlt: 'Professional headshot of woman with brown hair in blue sweater smiling at camera',
      rating: 5,
      date: 'December 15, 2025',
      comment: 'Absolutely wonderful stay! The lodge exceeded all expectations. The rooms were clean and warm, the food was delicious, and the staff went above and beyond to make us feel welcome. The mountain views from the dining area are breathtaking. Highly recommend for anyone trekking to EBC!',
      isVerified: true,
      photos: [
      {
        url: "https://images.unsplash.com/photo-1692127879324-cf97556a6ff4",
        alt: 'Sunrise view of Mount Everest from lodge terrace with orange and pink sky'
      },
      {
        url: "https://images.unsplash.com/photo-1718359759373-1b2670b7478b",
        alt: 'Cozy bedroom interior with warm lighting and mountain view through window'
      }]

    },
    {
      id: '2',
      userName: 'Michael Chen',
      userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10cadd384-1763292115349.png",
      userAvatarAlt: 'Professional headshot of Asian man with short black hair in gray shirt',
      rating: 5,
      date: 'November 28, 2025',
      comment: 'Perfect location for acclimatization in Namche. The hot showers were a blessing after long trekking days. WiFi worked surprisingly well for the altitude. The owner Pemba and his family are incredibly kind and helpful with trek advice.',
      isVerified: true
    },
    {
      id: '3',
      userName: 'Emma Rodriguez',
      userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_162a57531-1763296100992.png",
      userAvatarAlt: 'Professional headshot of Hispanic woman with long dark hair in white blouse',
      rating: 4,
      date: 'November 10, 2025',
      comment: 'Great lodge with excellent facilities. Only minor issue was some noise from the common area in the evenings, but that\'s expected in a social trekking environment. The breakfast was hearty and perfect for fueling up before the day\'s trek. Would definitely stay again!',
      isVerified: true,
      photos: [
      {
        url: "https://images.unsplash.com/photo-1522803733288-80645f49342c",
        alt: 'Traditional Nepali breakfast plate with dal bhat, eggs, and vegetables on wooden table'
      }]

    }]

  };

  const breadcrumbItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/hotel-guide-listing' },
  { label: mockData.name, path: '/hotel-guide-detail' }];


  return (
    <>
      <Header />
      <div className="mx-4 lg:mx-16">
        <BreadcrumbTrail customItems={breadcrumbItems} />
      </div>
      <HotelGuideDetailInteractive data={mockData} />
    </>);

}