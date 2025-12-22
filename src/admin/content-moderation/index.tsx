import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ContentCard from './components/ContentCard';
import FilterBar from './components/FilterBar';
import StatsPanel from './components/StatsPanel';
import ViolationTrends from './components/ViolationTrends';
import ModerationModal from './components/ModerationModal';
import {
  ContentItem,
  FilterOptions,
  ModerationStats,
  GuidelineViolation,
  ModerationAction,
  ViolationType } from
'./types';
import AdminSidebar from 'components/admin-components/AdminSidebar';
import AdminHeader from 'components/admin-components/AdminHeader';
import BulkActionsBar from './components/BulkActionBar';
import Icon from 'components/ui/AppIcon';


const ContentModeration = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    contentType: 'all',
    status: 'pending',
    dateRange: 'all',
    userRating: 'all',
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const mockStats: ModerationStats = {
    totalPending: 47,
    totalApproved: 1234,
    totalRejected: 89,
    totalFlagged: 12,
    avgReviewTime: '3.5 min',
    todayReviewed: 28
  };

  const mockViolations: GuidelineViolation[] = [
  { type: 'spam', count: 23, trend: 'down', percentage: 15 },
  { type: 'inappropriate', count: 18, trend: 'up', percentage: 12 },
  { type: 'copyright', count: 12, trend: 'stable', percentage: 8 },
  { type: 'misleading', count: 8, trend: 'down', percentage: 5 }];


  const mockContent: ContentItem[] = [
  {
    id: '1',
    type: 'story',
    title: 'My Journey to Everest Base Camp: A Life-Changing Experience',
    description:
    'After months of preparation, I finally completed the trek to Everest Base Camp. The journey was challenging but incredibly rewarding, with breathtaking views at every turn.',
    thumbnail: "https://images.unsplash.com/photo-1515655879891-e27ef499ef88",
    thumbnailAlt:
    'Panoramic view of snow-capped Himalayan mountains with prayer flags in foreground at sunrise',
    submittedBy: {
      id: 'u1',
      name: 'Sarah Mitchell',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10df5a971-1765003957966.png",
      avatarAlt: 'Professional woman with brown hair smiling at camera',
      rating: 4.8,
      totalSubmissions: 15
    },
    submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'pending',
    flagCount: 0,
    viewCount: 234,
    likeCount: 45,
    content:
    'The trek to Everest Base Camp was one of the most challenging yet rewarding experiences of my life. Starting from Lukla, we spent 12 days ascending through beautiful Sherpa villages, crossing suspension bridges, and acclimatizing to the altitude.\n\nThe highlight was reaching Base Camp at 5,364 meters, surrounded by the majestic Himalayas. The sense of accomplishment was overwhelming, and the views were absolutely breathtaking.',
    location: 'Everest Base Camp',
    tags: ['Everest', 'Trekking', 'Adventure', 'Himalayas']
  },
  {
    id: '2',
    type: 'photo',
    title: 'Sunrise at Poon Hill - Annapurna Range',
    description:
    'Captured this stunning sunrise view of the Annapurna range from Poon Hill. The golden light on the snow-capped peaks was magical.',
    thumbnail: "https://images.unsplash.com/photo-1582471586011-aba66721305f",
    thumbnailAlt:
    'Golden sunrise illuminating snow-covered Annapurna mountain peaks with orange and pink sky',
    submittedBy: {
      id: 'u2',
      name: 'David Chen',
      avatar: "https://images.unsplash.com/photo-1713870816826-08e4b536d1ed",
      avatarAlt: 'Asian man with glasses wearing blue shirt outdoors',
      rating: 4.9,
      totalSubmissions: 28
    },
    submittedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    status: 'pending',
    flagCount: 0,
    viewCount: 567,
    likeCount: 123,
    location: 'Poon Hill',
    tags: ['Photography', 'Sunrise', 'Annapurna', 'Landscape']
  },
  {
    id: '3',
    type: 'video',
    title: 'Helicopter Tour of Mount Everest',
    description:
    'An incredible helicopter tour around Mount Everest, showcasing the worlds highest peak from unique aerial perspectives.',
    thumbnail: "https://images.unsplash.com/photo-1711233852134-46110717e55d",
    thumbnailAlt:
    'Aerial view of Mount Everest peak covered in snow with clouds below',
    submittedBy: {
      id: 'u3',
      name: 'Emma Thompson',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1387e39bc-1765229993079.png",
      avatarAlt: 'Young woman with blonde hair smiling in outdoor setting',
      rating: 4.7,
      totalSubmissions: 12
    },
    submittedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    status: 'pending',
    flagCount: 1,
    viewCount: 892,
    likeCount: 234,
    location: 'Mount Everest',
    tags: ['Video', 'Helicopter', 'Everest', 'Aerial']
  },
  {
    id: '4',
    type: 'review',
    title: 'Amazing Trek with Himalayan Guides',
    description:
    'Had an incredible experience with Himalayan Guides on the Annapurna Circuit. Professional, knowledgeable, and very safety-conscious.',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1599a7231-1765176613654.png",
    thumbnailAlt:
    'Group of trekkers with backpacks walking on mountain trail with guide',
    submittedBy: {
      id: 'u4',
      name: 'Michael Brown',
      avatar: "https://images.unsplash.com/photo-1667723500492-d705b9912b6b",
      avatarAlt: 'Man with beard wearing trekking gear and sunglasses',
      rating: 4.6,
      totalSubmissions: 8
    },
    submittedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    status: 'pending',
    flagCount: 0,
    viewCount: 345,
    likeCount: 67,
    content:
    'I recently completed the Annapurna Circuit with Himalayan Guides and cannot recommend them highly enough. Our guide, Pemba, was incredibly knowledgeable about the region, its culture, and the mountains.\n\nThe entire team was professional, safety-conscious, and went above and beyond to ensure we had a memorable experience. The accommodations were well-chosen, and the pace was perfect for acclimatization.',
    location: 'Annapurna Circuit',
    tags: ['Review', 'Guide Service', 'Annapurna', 'Trekking']
  },
  {
    id: '5',
    type: 'story',
    title: 'Solo Female Trekker: My Langtang Valley Adventure',
    description:
    'As a solo female traveler, I was initially nervous about trekking in Nepal. The Langtang Valley trek proved to be safe, welcoming, and absolutely beautiful.',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1e47c2ad4-1765545822041.png",
    thumbnailAlt:
    'Female trekker standing on mountain trail with valley and peaks in background',
    submittedBy: {
      id: 'u5',
      name: 'Lisa Anderson',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1246d41fb-1764802362452.png",
      avatarAlt: 'Woman with red hair wearing hiking jacket smiling',
      rating: 4.9,
      totalSubmissions: 22
    },
    submittedAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
    status: 'pending',
    flagCount: 0,
    viewCount: 678,
    likeCount: 145,
    content:
    'Trekking solo in the Langtang Valley was one of the best decisions I have made. The trail is well-marked, the teahouses are welcoming, and I met wonderful people along the way.\n\nThe local Tamang culture is fascinating, and the mountain views are spectacular. I felt safe throughout the journey and would encourage other solo female travelers to consider this trek.',
    location: 'Langtang Valley',
    tags: ['Solo Travel', 'Female Traveler', 'Langtang', 'Safety']
  },
  {
    id: '6',
    type: 'photo',
    title: 'Traditional Sherpa Village in Khumbu Region',
    description:
    'Beautiful traditional Sherpa village with colorful prayer flags and stunning mountain backdrop in the Khumbu region.',
    thumbnail: "https://images.unsplash.com/photo-1540876508220-988a11575ed6",
    thumbnailAlt:
    'Traditional stone houses with colorful prayer flags in Sherpa village with mountains behind',
    submittedBy: {
      id: 'u6',
      name: 'James Wilson',
      avatar: "https://images.unsplash.com/photo-1726099232663-6226c61d50ee",
      avatarAlt: 'Man with camera equipment in mountain setting',
      rating: 4.8,
      totalSubmissions: 34
    },
    submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: 'pending',
    flagCount: 0,
    viewCount: 456,
    likeCount: 89,
    location: 'Khumbu Region',
    tags: ['Culture', 'Sherpa', 'Village', 'Photography']
  }];


  const [contentItems, setContentItems] = useState<ContentItem[]>(mockContent);

  const handleSelectContent = (id: string) => {
    setSelectedIds((prev) =>
    prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const visibleIds = contentItems.map((item) => item.id);
    setSelectedIds(visibleIds);
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  const handleViewDetails = (content: ContentItem) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  const handleContentAction = (
  id: string,
  action: ModerationAction,
  reason?: string,
  violations?: ViolationType[]) =>
  {
    setContentItems((prev) =>
    prev.map((item) =>
    item.id === id ?
    {
      ...item,
      status:
      action === 'approve' ? 'approved' :
      action === 'reject' ? 'rejected' : 'flagged'
    } :
    item
    )
    );
    setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  const handleBulkAction = (action: ModerationAction) => {
    setContentItems((prev) =>
    prev.map((item) =>
    selectedIds.includes(item.id) ?
    {
      ...item,
      status:
      action === 'approve' ? 'approved' :
      action === 'reject' ? 'rejected' : 'flagged'
    } :
    item
    )
    );
    setSelectedIds([]);
  };

  const handleModalAction = (
  action: ModerationAction,
  reason?: string,
  violations?: ViolationType[]) =>
  {
    if (selectedContent) {
      handleContentAction(selectedContent.id, action, reason, violations);
    }
  };

  const handleRefresh = () => {
    setContentItems(mockContent);
    setSelectedIds([]);
  };

  const pendingCount = contentItems.filter(
    (item) => item.status === 'pending'
  ).length;

  return (
    <>
      <Helmet>
        <title>Content Moderation - Nepal Trek Explorer Admin</title>
        <meta
          name="description"
          content="Review and moderate user-generated content including stories, photos, videos, and reviews for Nepal Trek Explorer platform" />

      </Helmet>

      <div className="min-h-screen bg-background">
        <AdminSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          userRole="admin" />


        <AdminHeader
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          userName="Admin User"
          userRole="Content Moderator"
          userAvatar="https://randomuser.me/api/portraits/men/1.jpg"
          notificationCount={pendingCount} />


        <main className="lg:ml-60 pt-16">
          <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                Content Moderation
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Review and approve user-generated content for the platform
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2 space-y-6">
                <FilterBar
                  filters={filters}
                  onFilterChange={setFilters}
                  pendingCount={pendingCount}
                  onRefresh={handleRefresh} />


                <BulkActionsBar
                  selectedCount={selectedIds.length}
                  onSelectAll={handleSelectAll}
                  onDeselectAll={handleDeselectAll}
                  onBulkAction={handleBulkAction} />


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {contentItems.map((content) =>
                  <ContentCard
                    key={content.id}
                    content={content}
                    isSelected={selectedIds.includes(content.id)}
                    onSelect={handleSelectContent}
                    onAction={handleContentAction}
                    onViewDetails={handleViewDetails} />

                  )}
                </div>

                {contentItems.length === 0 &&
                <div className="bg-card border border-border rounded-lg p-12 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                        <Icon
                        name="FileCheck"
                        size={32}
                        className="text-muted-foreground" />

                      </div>
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                      No Content to Review
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      All content has been reviewed. Check back later for new
                      submissions.
                    </p>
                  </div>
                }
              </div>

              <div className="space-y-6">
                <StatsPanel stats={mockStats} />
                <ViolationTrends violations={mockViolations} />
              </div>
            </div>
          </div>
        </main>

        <ModerationModal
          content={selectedContent}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedContent(null);
          }}
          onAction={handleModalAction} />

      </div>
    </>);

};

export default ContentModeration;