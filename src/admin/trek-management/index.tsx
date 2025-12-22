import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';

import Button from '../../components/ui/Button';
import { Trek, TrekFilters, TrekStats, BulkAction, SortConfig } from './types';
import AdminSidebar from 'components/admin-components/AdminSidebar';
import AdminHeader from 'components/admin-components/AdminHeader';
import TrekStatsCard from './components/TrekStatsCard';
import TrekFiltersComponent from './components/TrekFilters';
import TrekTable from './components/TrekTable';
import TrekDetailModal from './components/TrekDetailModal';
import BulkActionsBar from './components/BulkActionsBar';

const TrekManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTrek, setSelectedTrek] = useState<Trek | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTreks, setSelectedTreks] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'lastUpdated',
    direction: 'desc'
  });

  const [filters, setFilters] = useState<TrekFilters>({
    search: '',
    difficulty: [],
    region: [],
    durationMin: 0,
    durationMax: 30,
    permitRequired: null,
    status: [],
    featured: null
  });

  const mockTreks: Trek[] = [
  {
    id: '1',
    name: 'Everest Base Camp Trek',
    region: 'Everest',
    difficulty: 'Challenging',
    duration: 14,
    maxAltitude: 5364,
    bestSeason: 'March-May, September-November',
    permitRequired: true,
    status: 'Published',
    featured: true,
    lastUpdated: new Date('2025-12-15'),
    createdAt: new Date('2024-01-10'),
    price: { min: 85000, max: 125000, currency: 'NPR' },
    route: {
      startPoint: 'Lukla',
      endPoint: 'Lukla',
      totalDistance: 130
    },
    safety: {
      riskLevel: 'High',
      emergencyContacts: ['+977-1-4700123', '+977-9851234567'],
      medicalFacilities: true
    },
    images: [
    {
      url: "https://images.unsplash.com/photo-1564926066302-806573739c8d",
      alt: 'Majestic view of Mount Everest peak covered in snow with prayer flags in foreground at sunrise'
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_14902e64d-1764855707074.png",
      alt: 'Trekkers walking on mountain trail with snow-capped Himalayan peaks in background'
    }],

    description: `The Everest Base Camp trek is one of the most iconic trekking routes in the world, offering breathtaking views of the world's highest peak. This challenging journey takes you through Sherpa villages, Buddhist monasteries, and stunning mountain landscapes.\n\nThe trek provides an opportunity to experience the unique culture of the Khumbu region while testing your physical endurance at high altitudes.`,
    highlights: [
    'Stunning views of Mount Everest and surrounding peaks',
    'Visit to Tengboche Monastery',
    'Experience Sherpa culture and hospitality',
    'Reach Everest Base Camp at 5,364m'],

    requirements: [
    'Good physical fitness required',
    'Acclimatization days included',
    'Travel insurance mandatory',
    'TIMS card and National Park permit needed'],

    bookingCount: 342,
    rating: 4.8,
    reviewCount: 156
  },
  {
    id: '2',
    name: 'Annapurna Circuit Trek',
    region: 'Annapurna',
    difficulty: 'Strenuous',
    duration: 18,
    maxAltitude: 5416,
    bestSeason: 'March-May, October-November',
    permitRequired: true,
    status: 'Published',
    featured: true,
    lastUpdated: new Date('2025-12-18'),
    createdAt: new Date('2024-02-15'),
    price: { min: 95000, max: 145000, currency: 'NPR' },
    route: {
      startPoint: 'Besisahar',
      endPoint: 'Jomsom',
      totalDistance: 160
    },
    safety: {
      riskLevel: 'High',
      emergencyContacts: ['+977-1-4700456', '+977-9851234568'],
      medicalFacilities: true
    },
    images: [
    {
      url: "https://images.unsplash.com/photo-1587011551739-75d6f5d4e9e3",
      alt: 'Panoramic view of Annapurna mountain range with colorful prayer flags against clear blue sky'
    },
    {
      url: "https://images.unsplash.com/photo-1686248186220-f387a64505f4",
      alt: 'Traditional stone village houses with snow-covered Annapurna peaks in background during golden hour'
    }],

    description: `The Annapurna Circuit is renowned for its diverse landscapes, ranging from subtropical forests to high-altitude deserts. This classic trek circumnavigates the Annapurna massif, crossing the challenging Thorong La Pass at 5,416m.\n\nTrekkers experience dramatic changes in climate, culture, and scenery, making it one of the most varied and rewarding treks in Nepal.`,
    highlights: [
    'Cross Thorong La Pass at 5,416m',
    'Diverse landscapes and ecosystems',
    'Visit ancient Buddhist monasteries',
    'Experience multiple cultural zones'],

    requirements: [
    'Excellent physical condition required',
    'Previous trekking experience recommended',
    'Comprehensive travel insurance mandatory',
    'ACAP and TIMS permits required'],

    bookingCount: 287,
    rating: 4.9,
    reviewCount: 198
  },
  {
    id: '3',
    name: 'Langtang Valley Trek',
    region: 'Langtang',
    difficulty: 'Moderate',
    duration: 10,
    maxAltitude: 4984,
    bestSeason: 'March-May, September-November',
    permitRequired: true,
    status: 'Published',
    featured: false,
    lastUpdated: new Date('2025-12-10'),
    createdAt: new Date('2024-03-20'),
    price: { min: 55000, max: 85000, currency: 'NPR' },
    route: {
      startPoint: 'Syabrubesi',
      endPoint: 'Syabrubesi',
      totalDistance: 85
    },
    safety: {
      riskLevel: 'Medium',
      emergencyContacts: ['+977-1-4700789', '+977-9851234569'],
      medicalFacilities: true
    },
    images: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_15e79584b-1765870898431.png",
      alt: 'Serene Langtang valley with traditional wooden lodges surrounded by rhododendron forests and mountain peaks'
    },
    {
      url: "https://images.unsplash.com/photo-1720055703742-06da10976dd8",
      alt: 'Yak caravan crossing wooden suspension bridge over turquoise river in Langtang valley'
    }],

    description: `The Langtang Valley Trek offers a perfect combination of natural beauty and cultural richness. Located close to Kathmandu, this trek takes you through lush forests, traditional Tamang villages, and stunning mountain scenery.\n\nThe valley was significantly affected by the 2015 earthquake but has since recovered, with rebuilt villages welcoming trekkers with warm hospitality.`,
    highlights: [
    'Beautiful Langtang Valley views',
    'Visit Kyanjin Gompa monastery',
    'Experience Tamang culture',
    'Close proximity to Kathmandu'],

    requirements: [
    'Moderate fitness level required',
    'Basic trekking experience helpful',
    'Travel insurance recommended',
    'Langtang National Park permit needed'],

    bookingCount: 198,
    rating: 4.6,
    reviewCount: 89
  },
  {
    id: '4',
    name: 'Manaslu Circuit Trek',
    region: 'Manaslu',
    difficulty: 'Strenuous',
    duration: 16,
    maxAltitude: 5160,
    bestSeason: 'March-May, September-November',
    permitRequired: true,
    status: 'Under Review',
    featured: false,
    lastUpdated: new Date('2025-12-20'),
    createdAt: new Date('2024-04-05'),
    price: { min: 105000, max: 155000, currency: 'NPR' },
    route: {
      startPoint: 'Soti Khola',
      endPoint: 'Dharapani',
      totalDistance: 177
    },
    safety: {
      riskLevel: 'High',
      emergencyContacts: ['+977-1-4700321', '+977-9851234570'],
      medicalFacilities: false
    },
    images: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1632c0bad-1765870898090.png",
      alt: 'Remote Manaslu mountain peak rising above clouds with traditional stone chorten in foreground'
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1632c0bad-1765870898090.png",
      alt: 'Narrow mountain trail winding through terraced fields with Manaslu massif in background'
    }],

    description: `The Manaslu Circuit is a remote and less-crowded alternative to the popular Annapurna Circuit. This challenging trek circles the eighth-highest mountain in the world, offering pristine mountain scenery and authentic cultural experiences.\n\nThe route passes through diverse landscapes and traditional villages, providing a true wilderness trekking experience.`,
    highlights: [
    'Remote and less crowded trail',
    'Cross Larkya La Pass at 5,160m',
    'Stunning views of Manaslu massif',
    'Rich Buddhist culture and monasteries'],

    requirements: [
    'Excellent physical fitness essential',
    'Previous high-altitude experience required',
    'Restricted area permit mandatory',
    'Must trek with registered guide'],

    bookingCount: 124,
    rating: 4.7,
    reviewCount: 67
  },
  {
    id: '5',
    name: 'Upper Mustang Trek',
    region: 'Mustang',
    difficulty: 'Moderate',
    duration: 12,
    maxAltitude: 3840,
    bestSeason: 'March-November',
    permitRequired: true,
    status: 'Draft',
    featured: false,
    lastUpdated: new Date('2025-12-19'),
    createdAt: new Date('2024-05-12'),
    price: { min: 125000, max: 175000, currency: 'NPR' },
    route: {
      startPoint: 'Jomsom',
      endPoint: 'Jomsom',
      totalDistance: 120
    },
    safety: {
      riskLevel: 'Low',
      emergencyContacts: ['+977-1-4700654', '+977-9851234571'],
      medicalFacilities: false
    },
    images: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1182034be-1765781123948.png",
      alt: 'Ancient walled city of Lo Manthang with whitewashed buildings against barren desert mountains'
    },
    {
      url: "https://images.unsplash.com/photo-1696265637775-16dc288aaf91",
      alt: 'Colorful Buddhist monastery perched on cliff edge in arid Mustang landscape with prayer flags'
    }],

    description: `Upper Mustang, the former Kingdom of Lo, is a restricted area that preserves ancient Tibetan Buddhist culture. This unique trek takes you through a desert-like landscape with dramatic rock formations, ancient monasteries, and medieval villages.\n\nThe region remained closed to foreigners until 1992, helping preserve its unique culture and traditions.`,
    highlights: [
    'Visit the walled city of Lo Manthang',
    'Ancient Tibetan Buddhist culture',
    'Unique desert landscape',
    'Can trek during monsoon season'],

    requirements: [
    'Special restricted area permit required',
    'Must trek with registered guide',
    'Moderate fitness level needed',
    'Higher permit fees apply'],

    bookingCount: 89,
    rating: 4.5,
    reviewCount: 45
  },
  {
    id: '6',
    name: 'Gokyo Lakes Trek',
    region: 'Everest',
    difficulty: 'Challenging',
    duration: 12,
    maxAltitude: 5357,
    bestSeason: 'March-May, September-November',
    permitRequired: true,
    status: 'Published',
    featured: false,
    lastUpdated: new Date('2025-12-12'),
    createdAt: new Date('2024-06-08'),
    price: { min: 75000, max: 115000, currency: 'NPR' },
    route: {
      startPoint: 'Lukla',
      endPoint: 'Lukla',
      totalDistance: 110
    },
    safety: {
      riskLevel: 'High',
      emergencyContacts: ['+977-1-4700987', '+977-9851234572'],
      medicalFacilities: true
    },
    images: [
    {
      url: "https://images.unsplash.com/photo-1622476710836-d40b21edbf54",
      alt: 'Turquoise Gokyo Lake reflecting snow-capped Himalayan peaks with trekkers on shoreline'
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1d0cd96b0-1766337154958.png",
      alt: 'Panoramic view from Gokyo Ri summit showing chain of glacial lakes and Everest massif'
    }],

    description: `The Gokyo Lakes Trek is an alternative route in the Everest region, featuring stunning turquoise glacial lakes and spectacular mountain views. The trek includes climbing Gokyo Ri, which offers one of the best panoramic views of the Himalayas.\n\nThis route is less crowded than the traditional Everest Base Camp trek while offering equally impressive scenery.`,
    highlights: [
    'Visit six pristine glacial lakes',
    'Climb Gokyo Ri for panoramic views',
    'See Ngozumpa Glacier',
    'Less crowded than EBC route'],

    requirements: [
    'Good physical fitness required',
    'Proper acclimatization essential',
    'Travel insurance mandatory',
    'Sagarmatha National Park permit needed'],

    bookingCount: 167,
    rating: 4.7,
    reviewCount: 92
  }];


  const stats: TrekStats = useMemo(() => {
    return {
      total: mockTreks.length,
      published: mockTreks.filter((t) => t.status === 'Published').length,
      draft: mockTreks.filter((t) => t.status === 'Draft').length,
      underReview: mockTreks.filter((t) => t.status === 'Under Review').length,
      archived: mockTreks.filter((t) => t.status === 'Archived').length,
      featured: mockTreks.filter((t) => t.featured).length
    };
  }, [mockTreks]);

  const filteredTreks = useMemo(() => {
    let result = [...mockTreks];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (trek) =>
        trek.name.toLowerCase().includes(searchLower) ||
        trek.region.toLowerCase().includes(searchLower) ||
        trek.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.difficulty.length > 0) {
      result = result.filter((trek) => filters.difficulty.includes(trek.difficulty));
    }

    if (filters.region.length > 0) {
      result = result.filter((trek) => filters.region.includes(trek.region));
    }

    if (filters.status.length > 0) {
      result = result.filter((trek) => filters.status.includes(trek.status));
    }

    if (filters.permitRequired !== null) {
      result = result.filter((trek) => trek.permitRequired === filters.permitRequired);
    }

    if (filters.featured !== null) {
      result = result.filter((trek) => trek.featured === filters.featured);
    }

    result = result.filter(
      (trek) =>
      trek.duration >= filters.durationMin && trek.duration <= filters.durationMax
    );

    result.sort((a, b) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];

      if (aValue instanceof Date && bValue instanceof Date) {
        return sortConfig.direction === 'asc' ?
        aValue.getTime() - bValue.getTime() :
        bValue.getTime() - aValue.getTime();
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' ?
        aValue.localeCompare(bValue) :
        bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return result;
  }, [mockTreks, filters, sortConfig]);

  const handleSort = (field: keyof Trek) => {
    setSortConfig((prev) => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectTrek = (id: string) => {
    setSelectedTreks((prev) =>
    prev.includes(id) ? prev.filter((trekId) => trekId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedTreks.length === filteredTreks.length) {
      setSelectedTreks([]);
    } else {
      setSelectedTreks(filteredTreks.map((trek) => trek.id));
    }
  };

  const handleEdit = (trek: Trek) => {
    setSelectedTrek(trek);
    setModalOpen(true);
  };

  const handleStatusToggle = (trek: Trek) => {
    console.log('Toggle status for:', trek.name);
  };

  const handleSave = (trek: Trek) => {
    console.log('Save trek:', trek);
    setModalOpen(false);
  };

  const handleBulkAction = (action: BulkAction) => {
    console.log('Bulk action:', action, 'on treks:', selectedTreks);
    setSelectedTreks([]);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      difficulty: [],
      region: [],
      durationMin: 0,
      durationMax: 30,
      permitRequired: null,
      status: [],
      featured: null
    });
  };

  return (
    <>
      <Helmet>
        <title>Trek Management - Nepal Trek Explorer Admin</title>
        <meta
          name="description"
          content="Manage trekking routes, update trek information, and oversee all trek-related content for Nepal Trek Explorer platform" />

      </Helmet>

      <div className="min-h-screen bg-background">
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          userRole="admin" />


        <AdminHeader
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          userName="Admin User"
          userRole="Administrator"
          notificationCount={3}
          userAvatar="/images/default-avatar.png" />


        <main className="lg:ml-60 pt-16">
          <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground">
                  Trek Management
                </h1>
                <p className="text-sm md:text-base text-muted-foreground caption mt-2">
                  Manage and oversee all trekking routes and information
                </p>
              </div>
              <Button
                variant="default"
                size="default"
                iconName="Plus"
                iconPosition="left"
                iconSize={18}>

                Add New Trek
              </Button>
            </div>

            <div className="space-y-6">
              <TrekStatsCard stats={stats} />

              <TrekFiltersComponent
                filters={filters}
                onFilterChange={setFilters}
                onReset={handleResetFilters}
                resultCount={filteredTreks.length} />


              <TrekTable
                treks={filteredTreks}
                selectedTreks={selectedTreks}
                onSelectTrek={handleSelectTrek}
                onSelectAll={handleSelectAll}
                onEdit={handleEdit}
                onStatusToggle={handleStatusToggle}
                sortConfig={sortConfig}
                onSort={handleSort} />

            </div>
          </div>
        </main>

        <TrekDetailModal
          trek={selectedTrek}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave} />


        <BulkActionsBar
          selectedCount={selectedTreks.length}
          onAction={handleBulkAction}
          onClearSelection={() => setSelectedTreks([])} />

      </div>
    </>);

};

export default TrekManagement;