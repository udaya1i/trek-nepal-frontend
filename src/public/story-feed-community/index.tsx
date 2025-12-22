import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/ui/AppIcon';
import Button from '../../components/ui/Button';
import type { Story, FilterOptions } from './types';
import SearchBar from './components/SearchBar';
import FeaturedStory from './components/FeaturedStory';
import FilterSidebar from './components/FilterSidebar';
import SkeletonCard from './components/SkeletonCard';
import StoryCard from './components/StoryCard';
import Header from 'components/common/Header';

const StoryFeedCommunity = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [featuredStory, setFeaturedStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    location: '',
    difficulty: '',
    contentType: '',
    sortBy: 'recent'
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const mockStories: Story[] = [
  {
    id: '1',
    title: 'Conquering Everest Base Camp: A Journey of a Lifetime',
    excerpt: 'After months of preparation, I finally stood at the base of the world\'s highest peak. The journey was challenging but incredibly rewarding, with breathtaking views at every turn.',
    coverImage: "https://images.unsplash.com/photo-1515655879891-e27ef499ef88",
    coverImageAlt: 'Panoramic view of snow-capped Mount Everest peak with prayer flags in foreground at sunrise',
    author: {
      id: 'author1',
      name: 'Sarah Johnson',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e6e945e2-1764866141793.png",
      avatarAlt: 'Professional headshot of Sarah Johnson, woman with brown hair and warm smile',
      isVerified: true,
      followersCount: 2450
    },
    trek: {
      id: 'trek1',
      name: 'Everest Base Camp Trek',
      difficulty: 'Hard',
      location: 'everest'
    },
    publishedAt: new Date(Date.now() - 3600000 * 5),
    likesCount: 342,
    commentsCount: 56,
    sharesCount: 89,
    isLiked: false,
    isBookmarked: false,
    contentType: 'Photo Story',
    tags: ['everest', 'base-camp', 'himalaya', 'adventure']
  },
  {
    id: '2',
    title: 'Trail Conditions Update: Annapurna Circuit Post-Monsoon',
    excerpt: 'Recent monsoon rains have affected several sections of the Annapurna Circuit. Here\'s what you need to know before planning your trek this season.',
    coverImage: "https://images.unsplash.com/photo-1718456603911-065a98530f6c",
    coverImageAlt: 'Muddy mountain trail with trekkers walking through misty conditions after monsoon rain',
    author: {
      id: 'author2',
      name: 'Rajesh Sharma',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_175d5d34d-1764692975433.png",
      avatarAlt: 'Portrait of Rajesh Sharma, experienced guide with trekking gear and mountain backdrop',
      isVerified: true,
      followersCount: 5680
    },
    trek: {
      id: 'trek2',
      name: 'Annapurna Circuit',
      difficulty: 'Moderate',
      location: 'annapurna'
    },
    publishedAt: new Date(Date.now() - 3600000 * 12),
    likesCount: 189,
    commentsCount: 34,
    sharesCount: 45,
    isLiked: true,
    isBookmarked: true,
    contentType: 'Trail Condition',
    tags: ['annapurna', 'trail-update', 'monsoon', 'safety']
  },
  {
    id: '3',
    title: 'Cultural Immersion: Living with Sherpa Families in Namche Bazaar',
    excerpt: 'Spending a week with local Sherpa families gave me incredible insights into their rich culture, traditions, and the deep connection they have with the mountains.',
    coverImage: "https://images.unsplash.com/photo-1703212879904-b0cc5b35f3d4",
    coverImageAlt: 'Sherpa family in traditional colorful clothing standing outside stone house with mountain view',
    author: {
      id: 'author3',
      name: 'Emma Chen',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bcb90ef0-1765193213696.png",
      avatarAlt: 'Smiling portrait of Emma Chen wearing traditional Nepali scarf in mountain village',
      isVerified: false,
      followersCount: 890
    },
    trek: {
      id: 'trek1',
      name: 'Everest Base Camp Trek',
      difficulty: 'Hard',
      location: 'everest'
    },
    publishedAt: new Date(Date.now() - 3600000 * 24),
    likesCount: 267,
    commentsCount: 42,
    sharesCount: 67,
    isLiked: false,
    isBookmarked: false,
    contentType: 'Cultural Experience',
    tags: ['culture', 'sherpa', 'namche', 'local-life']
  },
  {
    id: '4',
    title: 'Essential Safety Tips for High-Altitude Trekking',
    excerpt: 'Altitude sickness is no joke. Learn from my experience and these expert tips to ensure a safe and enjoyable high-altitude trekking adventure.',
    coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_14e26bb55-1764657104373.png",
    coverImageAlt: 'Trekker checking altitude meter device with snow-covered peaks in background',
    author: {
      id: 'author4',
      name: 'Dr. Michael Roberts',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c36e01f2-1763299061563.png",
      avatarAlt: 'Professional photo of Dr. Michael Roberts in medical uniform with stethoscope',
      isVerified: true,
      followersCount: 12340
    },
    trek: {
      id: 'trek3',
      name: 'Manaslu Circuit Trek',
      difficulty: 'Expert',
      location: 'manaslu'
    },
    publishedAt: new Date(Date.now() - 3600000 * 36),
    likesCount: 523,
    commentsCount: 98,
    sharesCount: 156,
    isLiked: true,
    isBookmarked: true,
    contentType: 'Safety Update',
    tags: ['safety', 'altitude', 'health', 'tips']
  },
  {
    id: '5',
    title: 'Budget Trekking Guide: Langtang Valley on $30 a Day',
    excerpt: 'You don\'t need to break the bank to experience the beauty of Nepal\'s mountains. Here\'s how I completed the Langtang Valley trek on a tight budget.',
    coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_15e79584b-1765870898431.png",
    coverImageAlt: 'Simple mountain teahouse with wooden structure and prayer flags against valley backdrop',
    author: {
      id: 'author5',
      name: 'Alex Kumar',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1246d41fb-1764802362452.png",
      avatarAlt: 'Casual photo of Alex Kumar backpacker with hiking gear and friendly smile',
      isVerified: false,
      followersCount: 1560
    },
    trek: {
      id: 'trek4',
      name: 'Langtang Valley Trek',
      difficulty: 'Moderate',
      location: 'langtang'
    },
    publishedAt: new Date(Date.now() - 3600000 * 48),
    likesCount: 445,
    commentsCount: 87,
    sharesCount: 123,
    isLiked: false,
    isBookmarked: false,
    contentType: 'Travel Tips',
    tags: ['budget', 'langtang', 'tips', 'backpacking']
  },
  {
    id: '6',
    title: 'Photography Guide: Capturing the Magic of Mustang',
    excerpt: 'The ancient kingdom of Mustang offers incredible photography opportunities. Here are my tips for capturing its unique landscapes and culture.',
    coverImage: "https://images.unsplash.com/photo-1631356530382-1f372ffe3e4c",
    coverImageAlt: 'Ancient Buddhist monastery perched on cliff with dramatic red rock formations and blue sky',
    author: {
      id: 'author6',
      name: 'Lisa Anderson',
      avatar: "https://images.unsplash.com/photo-1663360641877-e3d063eb6f05",
      avatarAlt: 'Professional photographer Lisa Anderson holding camera with mountain landscape behind',
      isVerified: true,
      followersCount: 8920
    },
    trek: {
      id: 'trek5',
      name: 'Upper Mustang Trek',
      difficulty: 'Moderate',
      location: 'mustang'
    },
    publishedAt: new Date(Date.now() - 3600000 * 72),
    likesCount: 678,
    commentsCount: 112,
    sharesCount: 234,
    isLiked: false,
    isBookmarked: true,
    contentType: 'Photo Story',
    tags: ['photography', 'mustang', 'landscape', 'culture']
  }];


  useEffect(() => {
    const loadInitialData = () => {
      setIsLoading(true);
      setTimeout(() => {
        setStories(mockStories);
        setFeaturedStory(mockStories[0]);
        setFilteredStories(mockStories.slice(1));
        setIsLoading(false);
      }, 1000);
    };

    loadInitialData();
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = [...stories];

    if (featuredStory) {
      filtered = filtered.filter((story) => story.id !== featuredStory.id);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((story) =>
      story.title.toLowerCase().includes(query) ||
      story.excerpt.toLowerCase().includes(query) ||
      story.author.name.toLowerCase().includes(query) ||
      story.trek.name.toLowerCase().includes(query) ||
      story.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (filters.location) {
      filtered = filtered.filter((story) => story.trek.location === filters.location);
    }

    if (filters.difficulty) {
      filtered = filtered.filter((story) => story.trek.difficulty === filters.difficulty);
    }

    if (filters.contentType) {
      filtered = filtered.filter((story) => story.contentType === filters.contentType);
    }

    switch (filters.sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.likesCount - a.likesCount);
        break;
      case 'trending':
        filtered.sort((a, b) => b.likesCount + b.commentsCount + b.sharesCount - (a.likesCount + a.commentsCount + a.sharesCount));
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
        break;
    }

    setFilteredStories(filtered);
  }, [stories, featuredStory, searchQuery, filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleSearch = () => {
    applyFilters();
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      location: '',
      difficulty: '',
      contentType: '',
      sortBy: 'recent'
    });
    setSearchQuery('');
  };

  const handleLike = (storyId: string) => {
    setStories((prevStories) =>
    prevStories.map((story) =>
    story.id === storyId ?
    {
      ...story,
      isLiked: !story.isLiked,
      likesCount: story.isLiked ? story.likesCount - 1 : story.likesCount + 1
    } :
    story
    )
    );
  };

  const handleBookmark = (storyId: string) => {
    setStories((prevStories) =>
    prevStories.map((story) =>
    story.id === storyId ? { ...story, isBookmarked: !story.isBookmarked } : story
    )
    );
  };

  const handleShare = (storyId: string) => {
    const story = stories.find((s) => s.id === storyId);
    if (story) {
      if (navigator.share) {
        navigator.share({
          title: story.title,
          text: story.excerpt,
          url: window.location.origin + `/story-detail/${storyId}`
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.origin + `/story-detail/${storyId}`);
        alert('Link copied to clipboard!');
      }
    }
  };

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
      setIsLoading(false);
      if (page >= 3) {
        setHasMore(false);
      }
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Community Stories - Nepal Trek Explorer</title>
        <meta
          name="description"
          content="Discover authentic trekking experiences, trail conditions, and cultural insights shared by the Nepal Trek Explorer community. Read stories, tips, and updates from fellow trekkers." />

      </Helmet>

      <div className="min-h-screen bg-background">
        <Header
          // isAuthenticated={true}
          userName="John Doe"
          userAvatar="https://randomuser.me/api/portraits/men/1.jpg"
          onLogout={() => {}} />


        <main className="pt-[60px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumb
              items={[
                { label: 'Home', path: '/landing-home' },
                { label: 'Community', path: '/story-feed-community' },
                { label: 'Stories', path: '/story-feed-community' }
              ]}
            />

            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Community Stories</h1>
                <p className="text-muted-foreground">
                  Discover authentic experiences and insights from fellow trekkers
                </p>
              </div>
              <Link to="/create-story">
                <Button variant="default" iconName="Plus" iconPosition="left">
                  Share Story
                </Button>
              </Link>
            </div>

            <div className="mb-6">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSearch={handleSearch} />

            </div>

            {isLoading && !featuredStory ?
            <div className="mb-8">
                <div className="bg-card rounded-lg overflow-hidden border border-border animate-pulse">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="aspect-[16/10] md:aspect-auto bg-muted" />
                    <div className="p-6 md:p-8 space-y-4">
                      <div className="h-6 bg-muted rounded w-32" />
                      <div className="h-8 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted" />
                        <div className="space-y-2 flex-1">
                          <div className="h-3 bg-muted rounded w-24" />
                          <div className="h-2 bg-muted rounded w-32" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> :

            featuredStory &&
            <div className="mb-8">
                  <FeaturedStory story={featuredStory} />
                </div>

            }

            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters} />

              </div>

              <div className="lg:col-span-3">
                {filteredStories.length === 0 && !isLoading ?
                <div className="text-center py-16">
                    <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">No stories found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or search query
                    </p>
                    <Button variant="outline" onClick={handleResetFilters}>
                      Reset Filters
                    </Button>
                  </div> :

                <>
                    <div className="grid sm:grid-cols-2 gap-6 mb-8">
                      {isLoading && filteredStories.length === 0 ?
                    Array.from({ length: 6 }).map((_, index) =>
                    <SkeletonCard key={`skeleton-${index}`} />
                    ) :
                    filteredStories.map((story) =>
                    <StoryCard
                      key={story.id}
                      story={story}
                      onLike={handleLike}
                      onBookmark={handleBookmark}
                      onShare={handleShare} />

                    )}
                    </div>

                    {hasMore &&
                  <div className="text-center">
                        <Button
                      variant="outline"
                      onClick={loadMore}
                      loading={isLoading}
                      iconName="ChevronDown"
                      iconPosition="right">

                          Load More Stories
                        </Button>
                      </div>
                  }
                  </>
                }
              </div>
            </div>
          </div>
        </main>
      </div>
    </>);

};

export default StoryFeedCommunity;