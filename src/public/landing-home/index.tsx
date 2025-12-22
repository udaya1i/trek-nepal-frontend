import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/common/Header';

import HeroSection from './components/HeroSection';
import FeaturedTreks from './components/FeaturedTreks';
import TrekCategories from './components/TrekCategories';
import CommunityStories from './components/CommunityStories';
import PlatformStats from './components/PlatformStats';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import { Trek, TrekCategory, CommunityStory, PlatformStats as StatsType } from './types';

const LandingHome = () => {
  const [isAuthenticated] = useState(false);

  const featuredTreks: Trek[] = [
  {
    id: '1',
    name: 'Everest Base Camp Trek',
    location: 'Khumbu Region',
    difficulty: 'Hard',
    duration: '12-14 Days',
    maxAltitude: '5,364m',
    image: "https://images.unsplash.com/photo-1515245469645-19dbee02403e",
    alt: 'Panoramic view of Mount Everest base camp with colorful prayer flags and trekkers in foreground',
    rating: 4.9,
    reviews: 2847,
    price: '$1,299',
    bestSeason: 'Mar-May, Sep-Nov'
  },
  {
    id: '2',
    name: 'Annapurna Circuit Trek',
    location: 'Annapurna Region',
    difficulty: 'Moderate',
    duration: '15-20 Days',
    maxAltitude: '5,416m',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_106b57b49-1765770469085.png",
    alt: 'Stunning sunrise view of Annapurna mountain range with golden light illuminating snow peaks',
    rating: 4.8,
    reviews: 1923,
    price: '$1,099',
    bestSeason: 'Mar-May, Oct-Nov'
  },
  {
    id: '3',
    name: 'Langtang Valley Trek',
    location: 'Langtang Region',
    difficulty: 'Moderate',
    duration: '7-10 Days',
    maxAltitude: '4,984m',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15e79584b-1765870898431.png",
    alt: 'Serene Langtang valley with traditional stone houses and snow-capped mountains in background',
    rating: 4.7,
    reviews: 1456,
    price: '$799',
    bestSeason: 'Mar-May, Sep-Nov'
  },
  {
    id: '4',
    name: 'Manaslu Circuit Trek',
    location: 'Manaslu Region',
    difficulty: 'Expert',
    duration: '14-18 Days',
    maxAltitude: '5,160m',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1632c0bad-1765870898090.png",
    alt: 'Remote Manaslu circuit trail winding through pristine alpine landscape with dramatic mountain backdrop',
    rating: 4.9,
    reviews: 892,
    price: '$1,499',
    bestSeason: 'Mar-May, Sep-Nov'
  },
  {
    id: '5',
    name: 'Upper Mustang Trek',
    location: 'Mustang Region',
    difficulty: 'Hard',
    duration: '10-12 Days',
    maxAltitude: '3,840m',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_135aae35b-1764660932234.png",
    alt: 'Ancient Buddhist monasteries and traditional Tibetan villages in arid Upper Mustang landscape',
    rating: 4.8,
    reviews: 734,
    price: '$1,399',
    bestSeason: 'Mar-Nov'
  },
  {
    id: '6',
    name: 'Gokyo Lakes Trek',
    location: 'Khumbu Region',
    difficulty: 'Hard',
    duration: '12-15 Days',
    maxAltitude: '5,357m',
    image: "https://images.unsplash.com/photo-1726575665011-0f500e743a38",
    alt: 'Turquoise Gokyo lakes reflecting snow-covered Himalayan peaks under clear blue sky',
    rating: 4.9,
    reviews: 1567,
    price: '$1,249',
    bestSeason: 'Apr-May, Oct-Nov'
  }];


  const trekCategories: TrekCategory[] = [
  {
    id: '1',
    name: 'Easy Treks',
    icon: 'TrendingUp',
    image: "https://images.unsplash.com/photo-1605288204620-9ded36c63d36",
    alt: 'Gentle mountain trail with lush green forests and distant snow peaks suitable for beginners',
    trekCount: 24
  },
  {
    id: '2',
    name: 'Moderate Treks',
    icon: 'Mountain',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_118ca8055-1766164208023.png",
    alt: 'Intermediate difficulty trail with moderate elevation gain through alpine meadows',
    trekCount: 38
  },
  {
    id: '3',
    name: 'Hard Treks',
    icon: 'TrendingUp',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_123141e1d-1765340212144.png",
    alt: 'Challenging high-altitude trek with steep ascents and rugged mountain terrain',
    trekCount: 19
  },
  {
    id: '4',
    name: 'Expert Treks',
    icon: 'Award',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1719bad2c-1766164207782.png",
    alt: 'Extreme difficulty trek through remote glacial valleys and high mountain passes',
    trekCount: 12
  }];


  const communityStories: CommunityStory[] = [
  {
    id: '1',
    author: 'Sarah Johnson',
    authorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e0530897-1765819738200.png",
    authorAvatarAlt: 'Professional woman with blonde hair smiling at camera wearing blue outdoor jacket',
    trekName: 'My Journey to Everest Base Camp',
    image: "https://images.unsplash.com/photo-1536308825438-f281352bb589",
    alt: 'Trekker standing at Everest base camp with prayer flags and mountain panorama',
    likes: 342,
    comments: 56,
    timeAgo: '2 days ago',
    excerpt: 'An unforgettable experience that pushed my limits and rewarded me with breathtaking views. The journey taught me resilience and the beauty of nature.'
  },
  {
    id: '2',
    author: 'Rajesh Sharma',
    authorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b1dbbeb4-1766118863616.png",
    authorAvatarAlt: 'Smiling man with dark hair and beard wearing red trekking gear',
    trekName: 'Annapurna Circuit Adventure',
    image: "https://images.unsplash.com/flagged/photo-1568411541886-4b008aa0a5c3",
    alt: 'Dramatic sunrise over Annapurna mountain range with golden light on snow peaks',
    likes: 289,
    comments: 43,
    timeAgo: '5 days ago',
    excerpt: 'The diversity of landscapes on this trek is incredible. From lush forests to arid high-altitude deserts, every day brought new wonders.'
  },
  {
    id: '3',
    author: 'Emma Chen',
    authorAvatar: "https://images.unsplash.com/photo-1668049221607-1f2df20621cc",
    authorAvatarAlt: 'Young Asian woman with black hair smiling outdoors in hiking attire',
    trekName: 'Langtang Valley Discovery',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15e79584b-1765870898431.png",
    alt: 'Traditional stone village in Langtang valley with snow mountains in background',
    likes: 234,
    comments: 38,
    timeAgo: '1 week ago',
    excerpt: 'A perfect trek for those seeking authentic cultural experiences. The local hospitality and stunning mountain views made this trip truly special.'
  }];


  const platformStats: StatsType = {
    totalTreks: 156,
    verifiedGuides: 342,
    communityMembers: 12500,
    storiesShared: 4800
  };

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  return (
    <>
      <Helmet>
        <title>Nepal Trek Explorer - Discover Your Next Himalayan Adventure</title>
        <meta
          name="description"
          content="Explore Nepal's most breathtaking treks with trusted guides and authentic local experiences. Join our community of adventure seekers." />

        <meta name="keywords" content="Nepal trekking, Himalayan adventures, Everest base camp, Annapurna circuit, trekking guides" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header
          isAuthenticated={isAuthenticated}
          userAvatar=""
          userName=""
          onLogout={() => {}} />


        <main className="pt-[60px]">
          <HeroSection onSearch={handleSearch} />
          <FeaturedTreks treks={featuredTreks} />
          <TrekCategories categories={trekCategories} />
          <CommunityStories stories={communityStories} />
          <PlatformStats stats={platformStats} />
          <CallToAction />
        </main>

        <Footer />
      </div>
    </>);

};

export default LandingHome;