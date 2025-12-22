export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';
export type AlertType = 'weather' | 'trail_closure' | 'landslide' | 'emergency' | 'general';
export type AlertStatus = 'active' | 'resolved' | 'monitoring';

export interface SafetyAlert {
  id: string;
  title: string;
  description: string;
  type: AlertType;
  severity: AlertSeverity;
  status: AlertStatus;
  affectedTrails: string[];
  affectedRegions: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
  reportedBy: string;
  notificationsSent: number;
  affectedUsers: number;
}

export interface WeatherCondition {
  id: string;
  region: string;
  temperature: number;
  condition: string;
  windSpeed: number;
  precipitation: number;
  visibility: string;
  lastUpdated: Date;
  forecast: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  region: string;
  available24x7: boolean;
  languages: string[];
}

export interface TrekRoute {
  id: string;
  name: string;
  region: string;
  status: 'open' | 'closed' | 'restricted';
  safetyRating: number;
  coordinates: Array<{ lat: number; lng: number }>;
  activeAlerts: number;
}

export interface SafetyStatistics {
  totalActiveAlerts: number;
  criticalAlerts: number;
  affectedTrails: number;
  affectedUsers: number;
  resolvedToday: number;
  averageResponseTime: string;
}

export interface IncidentReport {
  id: string;
  title: string;
  description: string;
  location: string;
  severity: AlertSeverity;
  reportedAt: Date;
  reportedBy: string;
  status: 'pending' | 'investigating' | 'resolved';
}