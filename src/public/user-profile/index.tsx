import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProfileHeader from './components/ProfileHeader';
import StatsCard from './components/StatsCard';
import BadgeGrid from './components/BadgeGrid';
import CompletedTreksList from './components/CompletedTreksList';
import StoriesGrid from './components/StoriesGrid';
import SavedTreksList from './components/SavedTreksList';
import SettingsPanel from './components/SettingsPanel';
import { UserProfile, ViewMode, ActiveTab, ProfileSettings } from './types';

const UserProfilePage = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('id');
  const [viewMode, setViewMode] = useState<ViewMode>('private');
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isAuthenticated] = useState(true);

  useEffect(() => {
    if (userId) {
      setViewMode('public');
    } else {
      setViewMode('private');
    }
  }, [userId]);

  const mockProfile: UserProfile = {
    id: '1',
    name: 'Rajesh Kumar',
    username: 'rajesh_trekker',
    email: 'rajesh.kumar@email.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
    bio: 'Passionate trekker exploring the beautiful trails of Nepal. Love sharing my experiences and connecting with fellow adventurers. Completed 15+ major treks including Everest Base Camp and Annapurna Circuit.',
    location: 'Kathmandu, Nepal',
    experienceLevel: 'intermediate',
    joinedDate: new Date('2022-03-15'),
    isVerified: true,
    stats: {
      totalTreks: 15,
      totalDistance: 450,
      totalElevation: 35000,
      totalDays: 120,
      storiesShared: 12,
      reviewsWritten: 18
    },
    badges: [
    {
      id: '1',
      name: 'First Summit',
      description: 'Completed your first trek',
      icon: 'Mountain',
      category: 'achievement',
      earnedDate: new Date('2022-04-10')
    },
    {
      id: '2',
      name: 'Everest Region Explorer',
      description: 'Completed 3 treks in Everest region',
      icon: 'MapPin',
      category: 'region',
      earnedDate: new Date('2022-10-20'),
      progress: 3,
      maxProgress: 5
    },
    {
      id: '3',
      name: 'Hard Trek Master',
      description: 'Completed 5 hard difficulty treks',
      icon: 'Award',
      category: 'difficulty',
      earnedDate: new Date('2023-05-15')
    },
    {
      id: '4',
      name: 'Community Champion',
      description: 'Shared 10+ helpful stories',
      icon: 'Users',
      category: 'community',
      earnedDate: new Date('2023-08-22')
    },
    {
      id: '5',
      name: 'Annapurna Circuit',
      description: 'Completed Annapurna Circuit trek',
      icon: 'Compass',
      category: 'achievement',
      earnedDate: new Date('2023-11-05')
    },
    {
      id: '6',
      name: 'Winter Warrior',
      description: 'Completed trek in winter season',
      icon: 'Snowflake',
      category: 'achievement',
      earnedDate: new Date('2024-01-18')
    }],

    completedTreks: [
    {
      id: '1',
      trekId: 'ebc-trek',
      trekName: 'Everest Base Camp Trek',
      trekImage: "https://images.unsplash.com/photo-1693717671076-374d59bc2ff2",
      trekImageAlt: 'Panoramic view of Everest Base Camp with snow-capped peaks and prayer flags',
      difficulty: 'hard',
      duration: 14,
      completedDate: new Date('2023-04-20'),
      rating: 5,
      hasReview: true,
      hasStory: true
    },
    {
      id: '2',
      trekId: 'abc-trek',
      trekName: 'Annapurna Base Camp Trek',
      trekImage: "https://img.rocket.new/generatedImages/rocket_gen_img_129766091-1765781125620.png",
      trekImageAlt: 'Sunrise view at Annapurna Base Camp with golden light on mountain peaks',
      difficulty: 'moderate',
      duration: 10,
      completedDate: new Date('2023-11-05'),
      rating: 5,
      hasReview: true,
      hasStory: true
    },
    {
      id: '3',
      trekId: 'poon-hill',
      trekName: 'Poon Hill Trek',
      trekImage: "https://img.rocket.new/generatedImages/rocket_gen_img_106b57b49-1765770469085.png",
      trekImageAlt: 'Trekkers watching sunrise from Poon Hill viewpoint with Annapurna range in background',
      difficulty: 'easy',
      duration: 5,
      completedDate: new Date('2022-04-10'),
      rating: 4,
      hasReview: true,
      hasStory: false
    },
    {
      id: '4',
      trekId: 'langtang-trek',
      trekName: 'Langtang Valley Trek',
      trekImage: "https://img.rocket.new/generatedImages/rocket_gen_img_15e79584b-1765870898431.png",
      trekImageAlt: 'Scenic Langtang Valley with traditional stone houses and mountain backdrop',
      difficulty: 'moderate',
      duration: 8,
      completedDate: new Date('2023-09-15'),
      rating: 4,
      hasReview: true,
      hasStory: true
    }],

    stories: [
    {
      id: '1',
      title: 'My Journey to Everest Base Camp',
      coverImage: "https://images.unsplash.com/photo-1590656279092-b7b857c9ee00",
      coverImageAlt: 'Trekker standing at Everest Base Camp with expedition tents and Khumbu Icefall',
      trekName: 'Everest Base Camp Trek',
      publishedDate: new Date('2023-05-01'),
      likes: 245,
      comments: 32,
      views: 1250
    },
    {
      id: '2',
      title: 'Sunrise at Annapurna: A Magical Experience',
      coverImage: "https://images.unsplash.com/photo-1678632332649-f44d16330ea7",
      coverImageAlt: 'Golden sunrise illuminating Annapurna massif with dramatic cloud formations',
      trekName: 'Annapurna Base Camp Trek',
      publishedDate: new Date('2023-11-15'),
      likes: 189,
      comments: 24,
      views: 980
    },
    {
      id: '3',
      title: 'Langtang Valley: Hidden Gem of Nepal',
      coverImage: "https://images.unsplash.com/photo-1673871444880-76868437b4da",
      coverImageAlt: 'Peaceful Langtang Valley with yak grazing and snow-covered peaks',
      trekName: 'Langtang Valley Trek',
      publishedDate: new Date('2023-10-05'),
      likes: 156,
      comments: 18,
      views: 750
    }],

    savedTreks: [
    {
      id: '1',
      trekId: 'manaslu-trek',
      trekName: 'Manaslu Circuit Trek',
      trekImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1632c0bad-1765870898090.png",
      trekImageAlt: 'Remote Manaslu Circuit trail with suspension bridge over mountain river',
      difficulty: 'hard',
      duration: 16,
      savedDate: new Date('2024-01-10'),
      collection: 'Bucket List'
    },
    {
      id: '2',
      trekId: 'upper-mustang',
      trekName: 'Upper Mustang Trek',
      trekImage: "https://img.rocket.new/generatedImages/rocket_gen_img_135aae35b-1764660932234.png",
      trekImageAlt: 'Ancient Buddhist monasteries in Upper Mustang desert landscape',
      difficulty: 'moderate',
      duration: 12,
      savedDate: new Date('2024-01-15'),
      collection: 'Cultural Treks'
    },
    {
      id: '3',
      trekId: 'gokyo-lakes',
      trekName: 'Gokyo Lakes Trek',
      trekImage: "https://images.unsplash.com/photo-1692176048915-b4bbc02ee4ff",
      trekImageAlt: 'Turquoise Gokyo Lakes with reflection of Himalayan peaks',
      difficulty: 'hard',
      duration: 13,
      savedDate: new Date('2024-01-20'),
      collection: 'Bucket List'
    }],

    followers: 342,
    following: 156,
    isFollowing: false
  };

  const mockSettings: ProfileSettings = {
    privacy: {
      showEmail: false,
      showLocation: true,
      showStats: true,
      showCompletedTreks: true
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      followNotifications: true,
      commentNotifications: true,
      likeNotifications: false
    }
  };

  const tabs = [
  { id: 'overview' as const, label: 'Overview', icon: 'LayoutDashboard' },
  { id: 'treks' as const, label: 'Completed Treks', icon: 'Mountain' },
  { id: 'stories' as const, label: 'Stories', icon: 'BookOpen' },
  ...(viewMode === 'private' ? [
  { id: 'saved' as const, label: 'Saved', icon: 'Bookmark' },
  { id: 'settings' as const, label: 'Settings', icon: 'Settings' }] :
  [])];


  const handleEditProfile = () => {
    setActiveTab('settings');
  };

  const handleFollowToggle = () => {
    console.log('Follow toggled');
  };

  const handleRemoveSavedTrek = (trekId: string) => {
    console.log('Remove trek:', trekId);
  };

  const handleSaveSettings = (settings: ProfileSettings) => {
    console.log('Save settings:', settings);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={isAuthenticated}
        userAvatar={mockProfile.avatar}
        userName={mockProfile.name}
        onLogout={() => console.log('Logout')} />


      <main className="pt-[60px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Profile', href: '/profile' }]
          } />

          <div className="space-y-6">
            <ProfileHeader
              profile={mockProfile}
              viewMode={viewMode}
              onEditProfile={handleEditProfile}
              onFollowToggle={handleFollowToggle} />


            <div className="bg-card rounded-lg border border-border overflow-x-auto">
              <nav className="flex gap-1 p-2">
                {tabs.map((tab) =>
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors duration-200 whitespace-nowrap ${
                  activeTab === tab.id ?
                  'bg-primary text-primary-foreground' :
                  'text-foreground hover:bg-muted'}`
                  }>

                    <span className="text-sm">{tab.label}</span>
                  </button>
                )}
              </nav>
            </div>

            {activeTab === 'overview' &&
            <div className="space-y-6">
                <StatsCard stats={mockProfile.stats} />
                <BadgeGrid badges={mockProfile.badges} />
                <CompletedTreksList treks={mockProfile.completedTreks.slice(0, 4)} />
                <StoriesGrid stories={mockProfile.stories} />
              </div>
            }

            {activeTab === 'treks' &&
            <CompletedTreksList treks={mockProfile.completedTreks} />
            }

            {activeTab === 'stories' &&
            <StoriesGrid stories={mockProfile.stories} />
            }

            {activeTab === 'saved' && viewMode === 'private' &&
            <SavedTreksList
              treks={mockProfile.savedTreks}
              onRemove={handleRemoveSavedTrek} />

            }

            {activeTab === 'settings' && viewMode === 'private' &&
            <SettingsPanel
              settings={mockSettings}
              onSave={handleSaveSettings} />

            }
          </div>
        </div>
      </main>

      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Nepal Trek Explorer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>);

};

export default UserProfilePage;