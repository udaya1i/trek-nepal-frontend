import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import SafetyMap from './components/SafetyMap';
import AlertsTable from './components/AlertsTable';
import CreateAlertModal from './components/CreateAlertModal';
import SafetyStatisticsPanel from './components/SafetyStatisticsPanel';
import EmergencyContactsCard from './components/EmergencyContactsCard';
import WeatherConditionsCard from './components/WeatherConditionsCard';
import {
  SafetyAlert,
  TrekRoute,
  EmergencyContact,
  IncidentReport,
  WeatherCondition,
  SafetyStatistics,
} from './types';
import AdminHeader from 'components/admin-components/AdminHeader';
import AdminSidebar from 'components/admin-components/AdminSidebar';
import RecentIncidentsCard from './components/RecentincidentsCard';

const SafetyManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<SafetyAlert | null>(null);

  const mockStatistics: SafetyStatistics = {
    totalActiveAlerts: 12,
    criticalAlerts: 3,
    affectedTrails: 8,
    affectedUsers: 247,
    resolvedToday: 5,
    averageResponseTime: '2.5 hrs',
  };

  const mockAlerts: SafetyAlert[] = [
    {
      id: 'alert-001',
      title: 'Heavy Snowfall Warning - Everest Base Camp Route',
      description: 'Severe weather conditions expected with heavy snowfall and reduced visibility. Trekkers are advised to postpone their journey or seek shelter immediately.',
      type: 'weather',
      severity: 'critical',
      status: 'active',
      affectedTrails: ['Everest Base Camp', 'Kala Patthar'],
      affectedRegions: ['Everest Region', 'Khumbu Valley'],
      coordinates: { lat: 27.9881, lng: 86.9250 },
      createdAt: new Date('2025-12-21T10:30:00'),
      updatedAt: new Date('2025-12-21T14:15:00'),
      expiresAt: new Date('2025-12-22T18:00:00'),
      reportedBy: 'Weather Monitoring Team',
      notificationsSent: 156,
      affectedUsers: 89,
    },
    {
      id: 'alert-002',
      title: 'Trail Closure - Annapurna Circuit Section',
      description: 'Landslide has blocked the trail between Manang and Thorong La Pass. Alternative routes are being assessed. Estimated clearance time: 48 hours.',
      type: 'trail_closure',
      severity: 'high',
      status: 'active',
      affectedTrails: ['Annapurna Circuit'],
      affectedRegions: ['Annapurna Region', 'Manang District'],
      coordinates: { lat: 28.6644, lng: 84.0181 },
      createdAt: new Date('2025-12-20T16:45:00'),
      updatedAt: new Date('2025-12-21T09:00:00'),
      expiresAt: new Date('2025-12-23T12:00:00'),
      reportedBy: 'Trail Maintenance Team',
      notificationsSent: 234,
      affectedUsers: 67,
    },
    {
      id: 'alert-003',
      title: 'Landslide Risk - Langtang Valley',
      description: 'Recent rainfall has increased landslide risk in the Langtang Valley area. Trekkers should exercise extreme caution and avoid camping near steep slopes.',
      type: 'landslide',
      severity: 'high',
      status: 'monitoring',
      affectedTrails: ['Langtang Valley Trek', 'Gosaikunda Trek'],
      affectedRegions: ['Langtang Region'],
      coordinates: { lat: 28.2096, lng: 85.5390 },
      createdAt: new Date('2025-12-19T08:20:00'),
      updatedAt: new Date('2025-12-21T11:30:00'),
      reportedBy: 'Geological Survey Team',
      notificationsSent: 178,
      affectedUsers: 45,
    },
    {
      id: 'alert-004',
      title: 'Medical Emergency Response - Upper Mustang',
      description: 'Medical evacuation in progress for trekker experiencing altitude sickness. Helicopter rescue team deployed. All trekkers in the area advised to monitor their health closely.',
      type: 'emergency',
      severity: 'critical',
      status: 'active',
      affectedTrails: ['Upper Mustang Trek'],
      affectedRegions: ['Mustang Region'],
      coordinates: { lat: 29.1800, lng: 83.9800 },
      createdAt: new Date('2025-12-21T13:00:00'),
      updatedAt: new Date('2025-12-21T15:45:00'),
      reportedBy: 'Emergency Response Team',
      notificationsSent: 89,
      affectedUsers: 23,
    },
    {
      id: 'alert-005',
      title: 'Bridge Damage - Manaslu Circuit',
      description: 'Suspension bridge damaged due to strong winds. Temporary crossing arrangements being made. Trekkers should proceed with caution and follow guide instructions.',
      type: 'trail_closure',
      severity: 'medium',
      status: 'monitoring',
      affectedTrails: ['Manaslu Circuit'],
      affectedRegions: ['Manaslu Region'],
      coordinates: { lat: 28.5500, lng: 84.5600 },
      createdAt: new Date('2025-12-18T14:30:00'),
      updatedAt: new Date('2025-12-21T08:00:00'),
      reportedBy: 'Infrastructure Team',
      notificationsSent: 145,
      affectedUsers: 34,
    },
  ];

  const mockRoutes: TrekRoute[] = [
    {
      id: 'route-001',
      name: 'Everest Base Camp',
      region: 'Everest',
      status: 'restricted',
      safetyRating: 3.5,
      coordinates: [
        { lat: 27.9881, lng: 86.9250 },
        { lat: 28.0000, lng: 86.8500 },
      ],
      activeAlerts: 2,
    },
    {
      id: 'route-002',
      name: 'Annapurna Circuit',
      region: 'Annapurna',
      status: 'closed',
      safetyRating: 2.0,
      coordinates: [
        { lat: 28.6644, lng: 84.0181 },
        { lat: 28.7000, lng: 84.1000 },
      ],
      activeAlerts: 1,
    },
  ];

  const mockEmergencyContacts: EmergencyContact[] = [
    {
      id: 'contact-001',
      name: 'Pasang Sherpa',
      role: 'Emergency Coordinator',
      phone: '+977-9841234567',
      email: 'pasang.sherpa@nepaltrek.gov.np',
      region: 'Everest Region',
      available24x7: true,
      languages: ['English', 'Nepali', 'Sherpa'],
    },
    {
      id: 'contact-002',
      name: 'Dr. Sanjay Thapa',
      role: 'Medical Emergency Response',
      phone: '+977-9851234568',
      email: 'dr.thapa@nepaltrek.gov.np',
      region: 'Annapurna Region',
      available24x7: true,
      languages: ['English', 'Nepali', 'Hindi'],
    },
    {
      id: 'contact-003',
      name: 'Mingma Dorje',
      role: 'Rescue Operations Lead',
      phone: '+977-9861234569',
      email: 'mingma.dorje@nepaltrek.gov.np',
      region: 'Langtang Region',
      available24x7: true,
      languages: ['English', 'Nepali', 'Tibetan'],
    },
  ];

  const mockIncidents: IncidentReport[] = [
    {
      id: 'incident-001',
      title: 'Altitude Sickness Case Reported',
      description: 'Trekker experiencing severe altitude sickness symptoms at 4,500m elevation. Immediate descent recommended.',
      location: 'Everest Base Camp Trail',
      severity: 'high',
      reportedAt: new Date('2025-12-21T12:30:00'),
      reportedBy: 'Guide: Tenzing Norgay',
      status: 'investigating',
    },
    {
      id: 'incident-002',
      title: 'Minor Trail Blockage',
      description: 'Fallen tree blocking narrow section of trail. Can be bypassed but requires caution.',
      location: 'Annapurna Sanctuary',
      severity: 'low',
      reportedAt: new Date('2025-12-21T09:15:00'),
      reportedBy: 'Local Porter',
      status: 'pending',
    },
  ];

  const mockWeatherConditions: WeatherCondition[] = [
    {
      id: 'weather-001',
      region: 'Everest Region',
      temperature: -8,
      condition: 'Heavy Snow',
      windSpeed: 45,
      precipitation: 85,
      visibility: 'Poor (< 100m)',
      lastUpdated: new Date('2025-12-21T16:00:00'),
      forecast: 'Continued heavy snowfall expected for next 24 hours. Conditions may improve by evening of 22nd December.',
    },
    {
      id: 'weather-002',
      region: 'Annapurna Region',
      temperature: 5,
      condition: 'Partly Cloudy',
      windSpeed: 15,
      precipitation: 20,
      visibility: 'Good (> 5km)',
      lastUpdated: new Date('2025-12-21T16:00:00'),
      forecast: 'Stable weather conditions expected. Light rain possible in lower elevations during evening hours.',
    },
    {
      id: 'weather-003',
      region: 'Langtang Region',
      temperature: 2,
      condition: 'Cloudy with Rain',
      windSpeed: 25,
      precipitation: 60,
      visibility: 'Moderate (1-3km)',
      lastUpdated: new Date('2025-12-21T16:00:00'),
      forecast: 'Intermittent rain expected to continue. Landslide risk remains elevated in steep areas.',
    },
  ];

  const handleCreateAlert = (alertData: any) => {
    console.log('Creating new alert:', alertData);
  };

  const handleResolveAlert = (alertId: string) => {
    console.log('Resolving alert:', alertId);
  };

  const handleDeleteAlert = (alertId: string) => {
    console.log('Deleting alert:', alertId);
  };

  const handleViewAlertDetails = (alert: SafetyAlert) => {
    setSelectedAlert(alert);
  };

  const handleEditContact = (contact: EmergencyContact) => {
    console.log('Editing contact:', contact);
  };

  const handleAddContact = () => {
    console.log('Adding new emergency contact');
  };

  const handleViewIncidentDetails = (incident: IncidentReport) => {
    console.log('Viewing incident details:', incident);
  };

  const handleRefreshWeather = () => {
    console.log('Refreshing weather data');
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        userName="Safety Coordinator"
        userRole="Emergency Response Team"
        notificationCount={3}
        userAvatar="/default-avatar.png"
      />

      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        userRole="admin"
      />

      <main className="lg:ml-60 pt-16">
        <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground">
                Safety Management
              </h1>
              <p className="text-sm md:text-base text-muted-foreground mt-2">
                Monitor trail conditions, weather updates, and emergency alerts
              </p>
            </div>

            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="default"
                iconName="RefreshCw"
                iconPosition="left"
                className="flex-1 sm:flex-none"
              >
                Refresh Data
              </Button>
              <Button
                variant="default"
                size="default"
                iconName="AlertTriangle"
                iconPosition="left"
                onClick={() => setIsCreateModalOpen(true)}
                className="flex-1 sm:flex-none"
              >
                Create Alert
              </Button>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <SafetyStatisticsPanel statistics={mockStatistics} />

            <div className="bg-card border border-border rounded-lg p-4 md:p-6">
              <div className="mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-heading font-semibold">
                  Interactive Safety Map
                </h2>
                <p className="text-sm text-muted-foreground caption mt-1">
                  Real-time visualization of trail conditions and active alerts
                </p>
              </div>
              <SafetyMap
                routes={mockRoutes}
                alerts={mockAlerts}
                onAlertClick={handleViewAlertDetails}
                onRouteClick={(route) => console.log('Route clicked:', route)}
              />
            </div>

            <div className="bg-card border border-border rounded-lg p-4 md:p-6">
              <div className="mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-heading font-semibold">
                  Active Safety Alerts
                </h2>
                <p className="text-sm text-muted-foreground caption mt-1">
                  Manage and monitor all safety alerts across trekking regions
                </p>
              </div>
              <AlertsTable
                alerts={mockAlerts}
                onViewDetails={handleViewAlertDetails}
                onResolve={handleResolveAlert}
                onDelete={handleDeleteAlert}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EmergencyContactsCard
                contacts={mockEmergencyContacts}
                onEdit={handleEditContact}
                onAdd={handleAddContact}
              />

              <RecentIncidentsCard
                incidents={mockIncidents}
                onViewDetails={handleViewIncidentDetails}
              />
            </div>

            <WeatherConditionsCard
              conditions={mockWeatherConditions}
              onRefresh={handleRefreshWeather}
            />
          </div>
        </div>
      </main>

      <CreateAlertModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateAlert}
      />
    </div>
  );
};

export default SafetyManagement;