import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/common/Header";
import Breadcrumb from "../../components/ui/Breadcrumb";
import OverviewTab from "./components/OverviewTab";
import RouteMapTab from "./components/RouteMapTab";
import ItineraryTab from "./components/ItineraryTab";
import HotelsTab from "./components/HotelsTab";
import ReviewsTab from "./components/ReviewsTab";
import SafetyTab from "./components/SafetyTab";
import Sidebar from "./components/Sidebar";
import Icon from "../../components/ui/AppIcon";
import { Trek, TabType } from "./types";
import ImageCarousel from "./components/ImageCarousel";
import { dummyCheckpoints } from "./components/checkpointData";

const TrekDetail = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isAuthenticated] = useState(true);
  const [trek, setTrek] = useState<Trek>({
    id: "everest-base-camp",
    name: "Everest Base Camp Trek",
    region: "Khumbu, Nepal",
    description: "Experience the ultimate Himalayan adventure with stunning mountain views and Sherpa culture",
    longDescription: `The Everest Base Camp Trek is one of the most iconic trekking routes in the world, offering breathtaking views of the world's highest peaks and an immersive experience into Sherpa culture.\n\nThis challenging yet rewarding journey takes you through picturesque Sherpa villages, ancient monasteries, and diverse landscapes ranging from lush forests to high-altitude terrain. Along the way, you'll witness spectacular mountain vistas including Everest, Lhotse, Nuptse, and Ama Dablam.\n\nThe trek provides ample opportunities for acclimatization, ensuring a safe and enjoyable experience. You'll stay in traditional teahouses, interact with local communities, and gain insights into the unique mountain lifestyle. The journey culminates at Everest Base Camp (5,364m), where mountaineers prepare for their summit attempts.\n\nThis trek is suitable for physically fit individuals with proper preparation and acclimatization. The best seasons are spring (March-May) and autumn (September-November) when weather conditions are most favorable.`,
    images: [
      {
        id: "1",
        url: "https://img.rocket.new/generatedImages/rocket_gen_img_1e4ebe0a4-1764668665792.png",
        alt: "Panoramic view of Mount Everest peak covered in snow with dramatic clouds at sunset",
        caption: "Mount Everest - The roof of the world"
      },
      {
        id: "2",
        url: "https://img.rocket.new/generatedImages/rocket_gen_img_14902e64d-1764855707074.png",
        alt: "Trekkers walking on mountain trail with snow-capped Himalayan peaks in background",
        caption: "Trekking through the Khumbu region"
      },
      {
        id: "3",
        url: "https://images.unsplash.com/photo-1518804917388-3b0a615c174c",
        alt: "Traditional Buddhist prayer flags fluttering in wind with mountain backdrop",
        caption: "Prayer flags marking the sacred path"
      },
      {
        id: "4",
        url: "https://images.unsplash.com/photo-1597317991818-587eab3fc0d5",
        alt: "Sherpa village with traditional stone houses nestled in green valley surrounded by mountains",
        caption: "Traditional Sherpa village"
      }],

    stats: {
      duration: "12-14 days",
      difficulty: "Hard",
      maxAltitude: "5,364m",
      distance: "130km",
      bestSeason: "Mar-May, Sep-Nov",
      groupSize: "2-15 people"
    },
    permits: [
      {
        name: "Sagarmatha National Park Entry Permit",
        cost: "NPR 3,000 (USD 30)",
        description: "Required for entry into Sagarmatha National Park. Can be obtained in Kathmandu or at the park entrance in Monjo."
      },
      {
        name: "Khumbu Pasang Lhamu Rural Municipality Permit",
        cost: "NPR 2,000 (USD 20)",
        description: "Local area permit required for trekking in the Khumbu region. Available in Lukla or Kathmandu."
      }],

    packingList: [
      {
        category: "Clothing",
        items: [
          "Thermal base layers (top & bottom)",
          "Fleece jacket or pullover",
          "Down jacket (for high altitude)",
          "Waterproof jacket and pants",
          "Trekking pants (2-3 pairs)",
          "Warm hat and sun hat",
          "Gloves (liner and insulated)",
          "Hiking socks (4-5 pairs)"]

      },
      {
        category: "Footwear",
        items: [
          "Waterproof trekking boots",
          "Camp shoes or sandals",
          "Gaiters (optional but recommended)"]

      },
      {
        category: "Equipment",
        items: [
          "Sleeping bag (-15°C rated)",
          "Trekking poles",
          "Headlamp with extra batteries",
          "Sunglasses (UV protection)",
          "Water bottles or hydration system",
          "Daypack (25-30L)"]

      },
      {
        category: "Personal Items",
        items: [
          "Sunscreen (SPF 50+)",
          "Lip balm with SPF",
          "Personal first aid kit",
          "Toiletries and wet wipes",
          "Quick-dry towel",
          "Camera and extra batteries"]

      }],

    itinerary: [
      {
        day: 1,
        title: "Fly to Lukla, Trek to Phakding",
        description: "Early morning scenic flight from Kathmandu to Lukla (2,860m). After landing at Tenzing-Hillary Airport, meet your trekking crew and begin the trek. The trail descends through pine forests and follows the Dudh Koshi River valley. Pass through several small villages and cross suspension bridges decorated with prayer flags. Arrive at Phakding, a small village with teahouses and lodges.",
        altitude: "2,610m",
        duration: "3-4 hours",
        distance: "8km",
        accommodation: "Teahouse",
        meals: "Breakfast, Lunch, Dinner",
        checkpoints: [dummyCheckpoints.lukla, dummyCheckpoints.phakding, dummyCheckpoints.phakding, dummyCheckpoints.phakding, dummyCheckpoints.phakding,dummyCheckpoints.phakding]
      },
      {
        day: 2,
        title: "Phakding to Namche Bazaar",
        description: "Continue along the Dudh Koshi River, crossing several suspension bridges including the famous Hillary Suspension Bridge. Enter Sagarmatha National Park at Monjo checkpoint. The trail then climbs steeply through pine forests with occasional glimpses of Mount Everest. Arrive at Namche Bazaar, the gateway to Everest and the main trading hub of the Khumbu region. Explore the vibrant market and enjoy stunning mountain views.",
        altitude: "3,440m",
        duration: "5-6 hours",
        distance: "11km",
        accommodation: "Teahouse",
        meals: "Breakfast, Lunch, Dinner",
        checkpoints: [dummyCheckpoints.lukla, dummyCheckpoints.phakding]

      },
      {
        day: 3,
        title: "Acclimatization Day in Namche Bazaar",
        description: "Rest day for acclimatization. Take a short hike to Everest View Hotel (3,880m) for spectacular panoramic views of Everest, Lhotse, Ama Dablam, and other peaks. Visit the Sherpa Culture Museum and Everest Photo Gallery. Explore Namche's shops, bakeries, and internet cafes. This day is crucial for proper acclimatization before continuing to higher altitudes.",
        altitude: "3,440m",
        duration: "4-5 hours",
        distance: "5km (day hike)",
        accommodation: "Teahouse",
        meals: "Breakfast, Lunch, Dinner",
        checkpoints: [dummyCheckpoints.lukla, dummyCheckpoints.phakding]

      },
      {
        day: 4,
        title: "Namche Bazaar to Tengboche",
        description: "Trek through rhododendron and juniper forests with stunning mountain views. Pass through Phunki Tenga and climb to Tengboche, home to the famous Tengboche Monastery, the largest monastery in the Khumbu region. Attend evening prayer ceremony if timing permits. Enjoy magnificent views of Everest, Nuptse, Lhotse, Ama Dablam, and Thamserku.",
        altitude: "3,860m",
        duration: "5-6 hours",
        distance: "10km",
        accommodation: "Teahouse",
        meals: "Breakfast, Lunch, Dinner",
        checkpoints: [dummyCheckpoints.lukla, dummyCheckpoints.phakding]

      },
      {
        day: 5,
        title: "Tengboche to Dingboche",
        description: "Descend through forests to Debuche and cross the Imja River. Continue through alpine meadows and yak pastures. Pass through Pangboche village, one of the highest permanent settlements in the valley. Arrive at Dingboche, a summer settlement with stone-walled fields. The landscape becomes more barren and dramatic as you gain altitude.",
        altitude: "4,410m",
        duration: "5-6 hours",
        distance: "12km",
        accommodation: "Teahouse",
        meals: "Breakfast, Lunch, Dinner",
        checkpoints: [dummyCheckpoints.lukla, dummyCheckpoints.phakding]

      },
      {
        day: 6,
        title: "Acclimatization Day in Dingboche",
        description: "Another crucial acclimatization day. Take a day hike to Nagarjun Hill (5,100m) for stunning 360-degree views of the Himalayas including Makalu, Lhotse, and Island Peak. Alternatively, hike to Chhukung village. Rest and hydrate well. This day significantly improves your chances of successfully reaching Base Camp.",
        altitude: "4,410m",
        duration: "4-5 hours",
        distance: "6km (day hike)",
        accommodation: "Teahouse",
        meals: "Breakfast, Lunch, Dinner",
        checkpoints: [dummyCheckpoints.lukla, dummyCheckpoints.phakding]

      },
      {
        day: 7,
        title: "Dingboche to Lobuche",
        description: "Trek through the terminal moraine of the Khumbu Glacier. Pass memorials dedicated to climbers who lost their lives on Everest. The landscape becomes increasingly barren and rocky. Cross several streams and climb gradually to Lobuche. Views of Nuptse and other peaks dominate the skyline.",
        altitude: "4,910m",
        duration: "5-6 hours",
        distance: "8km",
        accommodation: "Teahouse",
        meals: "Breakfast, Lunch, Dinner",
        checkpoints: [dummyCheckpoints.lukla, dummyCheckpoints.phakding]

      },
      {
        day: 8,
        title: "Lobuche to Gorak Shep, Visit Everest Base Camp",
        description: "Trek to Gorak Shep, the last settlement before Base Camp. After lunch and rest, continue to Everest Base Camp (5,364m). Walk on the Khumbu Glacier and reach the base camp area where mountaineers prepare for summit attempts. Enjoy the achievement and take photos. Return to Gorak Shep for overnight stay.",
        altitude: "5,164m (Gorak Shep)",
        duration: "7-8 hours",
        distance: "13km",
        accommodation: "Teahouse",
        meals: "Breakfast, Lunch, Dinner",
        checkpoints: [dummyCheckpoints.lukla, dummyCheckpoints.phakding]

      },
      {
        day: 9,
        title: "Gorak Shep to Kala Patthar, Descend to Pheriche",
        description: "Early morning hike to Kala Patthar (5,545m) for the best views of Mount Everest and surrounding peaks at sunrise. This is the highlight of the trek with panoramic views of the Himalayas. Descend back to Gorak Shep for breakfast, then continue descent to Pheriche. The descent provides relief from high altitude.",
        altitude: "4,240m",
        duration: "8-9 hours",
        distance: "16km",
        accommodation: "Teahouse",
        meals: "Breakfast, Lunch, Dinner",
        checkpoints: [dummyCheckpoints.lukla, dummyCheckpoints.phakding]

      },
      {
        day: 10,
        title: "Pheriche to Namche Bazaar",
        description: "Long descent day through familiar territory. Pass through Pangboche and Tengboche, enjoying the downhill trek. Cross the Dudh Koshi River and climb back up to Namche Bazaar. Celebrate the successful completion of the trek with your team.",
        altitude: "3,440m",
        duration: "6-7 hours",
        distance: "20km",
        accommodation: "Teahouse",
        meals: "Breakfast, Lunch, Dinner",
        checkpoints: [dummyCheckpoints.lukla, dummyCheckpoints.phakding]

      },
      {
        day: 11,
        title: "Namche Bazaar to Lukla",
        description: "Final day of trekking. Descend through forests and villages, crossing suspension bridges. Pass through Phakding and continue to Lukla. Celebrate the completion of the trek with your crew. Prepare for the flight back to Kathmandu the next day.",
        altitude: "2,860m",
        duration: "6-7 hours",
        distance: "19km",
        accommodation: "Teahouse",
        meals: "Breakfast, Lunch, Dinner",
        checkpoints: [dummyCheckpoints.lukla, dummyCheckpoints.phakding]

      },
      {
        day: 12,
        title: "Fly back to Kathmandu",
        description: "Early morning flight from Lukla to Kathmandu. Enjoy the scenic mountain views during the 35-minute flight. Transfer to your hotel in Kathmandu. Rest and celebrate your achievement. Optional farewell dinner with the team.",
        altitude: "1,400m",
        duration: "35 minutes flight",
        distance: "N/A",
        accommodation: "Hotel",
        meals: "Breakfast",
        checkpoints: [dummyCheckpoints.lukla, dummyCheckpoints.phakding]

      }],

    routePoints: [
      { lat: 27.6869, lng: 86.7314, altitude: 2860, name: "Lukla" },
      { lat: 27.7402, lng: 86.7140, altitude: 2610, name: "Phakding" },
      { lat: 27.8047, lng: 86.7132, altitude: 3440, name: "Namche Bazaar" },
      { lat: 27.8369, lng: 86.7644, altitude: 3860, name: "Tengboche" },
      { lat: 27.8919, lng: 86.8311, altitude: 4410, name: "Dingboche" },
      { lat: 27.9258, lng: 86.8089, altitude: 4910, name: "Lobuche" },
      { lat: 27.9506, lng: 86.8289, altitude: 5164, name: "Gorak Shep" },
      { lat: 28.0026, lng: 86.8528, altitude: 5364, name: "Everest Base Camp" }],

    elevationProfile: [
      { distance: 0, altitude: 2860, location: "Lukla" },
      { distance: 8, altitude: 2610, location: "Phakding" },
      { distance: 19, altitude: 3440, location: "Namche" },
      { distance: 29, altitude: 3860, location: "Tengboche" },
      { distance: 41, altitude: 4410, location: "Dingboche" },
      { distance: 49, altitude: 4910, location: "Lobuche" },
      { distance: 52, altitude: 5164, location: "Gorak Shep" },
      { distance: 65, altitude: 5364, location: "Base Camp" }],

    hotels: [
      {
        id: "1",
        name: "Everest Summit Lodge",
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1caa8e723-1765384186630.png",
        alt: "Modern mountain lodge with wooden exterior and large windows overlooking snow-capped peaks",
        rating: 4.8,
        priceRange: "$40-60",
        location: "Namche Bazaar",
        verified: true,
        amenities: ["Hot Shower", "WiFi", "Restaurant", "Heating", "Mountain View"],
        contact: {
          phone: "+977-9841234567",
          whatsapp: "+977-9841234567",
          viber: "+977-9841234567"
        }
      },
      {
        id: "2",
        name: "Himalayan Lodge",
        image: "https://images.unsplash.com/photo-1636955868636-e29c7e5022cd",
        alt: "Traditional Sherpa-style lodge with stone walls and colorful prayer flags on rooftop",
        rating: 4.6,
        priceRange: "$30-50",
        location: "Tengboche",
        verified: true,
        amenities: ["Hot Shower", "Restaurant", "Monastery View", "Bakery"],
        contact: {
          phone: "+977-9841234568",
          whatsapp: "+977-9841234568",
          viber: "+977-9841234568"
        }
      },
      {
        id: "3",
        name: "Yak Lodge & Restaurant",
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_15e79584b-1765870898431.png",
        alt: "Rustic mountain teahouse with yaks grazing in foreground and dramatic mountain backdrop",
        rating: 4.5,
        priceRange: "$25-40",
        location: "Dingboche",
        verified: true,
        amenities: ["Hot Shower", "Restaurant", "Charging Station", "Common Room"],
        contact: {
          phone: "+977-9841234569",
          whatsapp: "+977-9841234569",
          viber: "+977-9841234569"
        }
      },
      {
        id: "4",
        name: "Base Camp Lodge",
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_14b0e114b-1766164208418.png",
        alt: "High-altitude lodge with solar panels and expedition gear storage area",
        rating: 4.3,
        priceRange: "$20-35",
        location: "Gorak Shep",
        verified: false,
        amenities: ["Basic Heating", "Restaurant", "Everest View"],
        contact: {
          phone: "+977-9841234570",
          whatsapp: "+977-9841234570",
          viber: "+977-9841234570"
        }
      }],

    reviews: [
      {
        id: "1",
        author: "Sarah Johnson",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e0530897-1765819738200.png",
        avatarAlt: "Professional woman with blonde hair smiling at camera wearing blue hiking jacket",
        date: "2 weeks ago",
        rating: 5,
        difficultyRating: 4,
        sceneryRating: 5,
        accommodationRating: 4,
        safetyRating: 5,
        verified: true,
        content: "This trek exceeded all my expectations! The views were absolutely breathtaking, and our guide was incredibly knowledgeable about the region and culture. The teahouses were comfortable, and the food was surprisingly good at high altitudes.\n\nThe acclimatization days were crucial and well-planned. I felt safe throughout the journey. Reaching Everest Base Camp was a dream come true. Highly recommend proper preparation and fitness training before attempting this trek.",
        helpful: 24,
        images: [
          {
            url: "https://images.unsplash.com/photo-1693717671076-374d59bc2ff2",
            alt: "Trekker standing at Everest Base Camp sign with Mount Everest visible in background"
          },
          {
            url: "https://images.unsplash.com/photo-1694520811966-aee5239dd119",
            alt: "Sunrise view from Kala Patthar showing golden light on Everest peak"
          }]

      },
      {
        id: "2",
        author: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1665111912062-87bde7daedc7",
        avatarAlt: "Asian man with black hair and glasses smiling outdoors in mountain setting",
        date: "1 month ago",
        rating: 5,
        difficultyRating: 5,
        sceneryRating: 5,
        accommodationRating: 3,
        safetyRating: 4,
        verified: true,
        content: "Challenging but absolutely worth it! The trek tested my physical and mental limits, but the sense of achievement at Base Camp was incredible. The Sherpa culture and hospitality added so much to the experience.\n\nBe prepared for basic accommodations at higher altitudes. The altitude sickness can be serious, so listen to your guide and take acclimatization seriously. The sunrise from Kala Patthar is something I'll never forget.",
        helpful: 18
      },
      {
        id: "3",
        author: "Emma Rodriguez",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1612278f8-1763294059882.png",
        avatarAlt: "Hispanic woman with brown hair in ponytail wearing red trekking gear smiling",
        date: "2 months ago",
        rating: 4,
        difficultyRating: 4,
        sceneryRating: 5,
        accommodationRating: 4,
        safetyRating: 5,
        verified: false,
        content: "An incredible journey through the Himalayas! The trek was well-organized, and our guide ensured everyone's safety. The monasteries along the way were fascinating, and the mountain views were spectacular.\n\nI recommend bringing extra warm clothes and a good sleeping bag. The weather can change quickly. Also, the WiFi is available but quite expensive at higher altitudes. Overall, a life-changing experience!",
        helpful: 15
      }],

    safetyAlerts: [
      {
        id: "1",
        type: "warning",
        title: "Weather Advisory",
        description: "Afternoon thunderstorms expected in the region. Plan to complete daily treks by early afternoon. Carry rain gear and warm layers.",
        date: "Updated 2 days ago"
      },
      {
        id: "2",
        type: "info",
        title: "Trail Maintenance",
        description: "Minor trail repairs ongoing between Namche and Tengboche. Expect slight delays. Alternative routes available if needed.",
        date: "Updated 1 week ago"
      }],

    weather: [
      { day: "Today", temp: "8°C", condition: "Partly Cloudy", icon: "CloudSun", precipitation: "10%" },
      { day: "Tomorrow", temp: "6°C", condition: "Sunny", icon: "Sun", precipitation: "5%" },
      { day: "Wed", temp: "5°C", condition: "Cloudy", icon: "Cloud", precipitation: "20%" },
      { day: "Thu", temp: "7°C", condition: "Clear", icon: "Sun", precipitation: "0%" }],

    similarTreks: [
      {
        id: "annapurna-circuit",
        name: "Annapurna Circuit Trek",
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1927d9a04-1766132893234.png",
        alt: "Annapurna mountain range with terraced fields in foreground during golden hour",
        duration: "15-20 days",
        difficulty: "Hard",
        rating: 4.9
      },
      {
        id: "langtang-valley",
        name: "Langtang Valley Trek",
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_15e79584b-1765870898431.png",
        alt: "Langtang valley with traditional villages and snow-capped peaks in background",
        duration: "7-10 days",
        difficulty: "Moderate",
        rating: 4.7
      },
      {
        id: "manaslu-circuit",
        name: "Manaslu Circuit Trek",
        image: "https://images.unsplash.com/photo-1728285186933-7ebcdb311fc0",
        alt: "Manaslu mountain with Buddhist stupa and prayer flags in foreground",
        duration: "14-18 days",
        difficulty: "Hard",
        rating: 4.8
      }],

    rating: 4.8,
    totalReviews: 156,
    bookmarked: false
  });

  const tabs: Array<{ id: TabType; label: string; icon: string; }> = [
    { id: "overview", label: "Overview", icon: "Info" },
    { id: "route", label: "Route Map", icon: "Map" },
    { id: "itinerary", label: "Itinerary", icon: "Calendar" },
    { id: "hotels", label: "Hotels", icon: "Home" },
    { id: "reviews", label: "Reviews", icon: "Star" },
    { id: "safety", label: "Safety", icon: "Shield" }];


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBookmark = () => {
    setTrek((prev) => ({ ...prev, bookmarked: !prev.bookmarked }));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: trek.name,
        text: trek.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleLogout = () => {
    window.location.href = "/login-register";
  };

  return (
    <>
      <Helmet>
        <title>{trek.name} - Nepal Trek Explorer</title>
        <meta name="description" content={trek.description} />
        <meta property="og:title" content={trek.name} />
        <meta property="og:description" content={trek.description} />
        <meta property="og:image" content={trek.images[0].url} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header
          isAuthenticated={isAuthenticated}
          userName="John Doe"
          userAvatar="https://randomuser.me/api/portraits/men/32.jpg"
          onLogout={handleLogout} />


        <main className="pt-[60px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumb
              items={[
                { label: "Home", path: "/landing-home" },
                { label: "Discover Treks", path: "/trek-listing" },
                { label: trek.name, path: "/trek-detail" }]
              } />


            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {trek.name}
              </h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <Icon name="MapPin" size={16} />
                {trek.region}
              </p>
            </div>

            <ImageCarousel images={trek.images} />

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-card border border-border rounded-lg sticky top-20 z-10 mb-6">
                  <div className="flex overflow-x-auto">
                    {tabs.map((tab) =>
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors duration-200 border-b-2 ${activeTab === tab.id ?
                          "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-foreground"}`
                        }>

                        <Icon name={tab.icon} size={18} />
                        <span>{tab.label}</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="min-h-[600px]">
                  {activeTab === "overview" && <OverviewTab trek={trek} />}
                  {activeTab === "route" &&
                    <RouteMapTab
                      routePoints={trek.routePoints}
                      elevationProfile={trek.elevationProfile} />

                  }
                  {activeTab === "itinerary" && <ItineraryTab itinerary={trek.itinerary} />}
                  {activeTab === "hotels" && <HotelsTab hotels={trek.hotels} />}
                  {activeTab === "reviews" &&
                    <ReviewsTab
                      reviews={trek.reviews}
                      averageRating={trek.rating}
                      totalReviews={trek.totalReviews} />

                  }
                  {activeTab === "safety" &&
                    <SafetyTab safetyAlerts={trek.safetyAlerts} weather={trek.weather} />
                  }
                </div>
              </div>

              <div className="lg:col-span-1">
                <Sidebar trek={trek} onBookmark={handleBookmark} onShare={handleShare} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>);

};

export default TrekDetail;