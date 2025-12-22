import React from 'react';
import { TrekRoute, SafetyAlert } from '../types';

interface SafetyMapProps {
  routes: TrekRoute[];
  alerts: SafetyAlert[];
  onAlertClick: (alert: SafetyAlert) => void;
  onRouteClick: (route: TrekRoute) => void;
}

const SafetyMap = ({ routes, alerts, onAlertClick, onRouteClick }: SafetyMapProps) => {
  const centerLat = 28.3949;
  const centerLng = 84.1240;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return '#059669';
      case 'closed':
        return '#DC2626';
      case 'restricted':
        return '#D97706';
      default:
        return '#6B7280';
    }
  };

  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden border border-border bg-card">
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title="Nepal Trek Safety Map"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${centerLat},${centerLng}&z=8&output=embed`}
        className="w-full h-full"
      />
      
      <div className="absolute top-4 left-4 right-4 md:left-auto md:right-4 md:w-64 bg-card/95 backdrop-blur-sm rounded-lg shadow-elevation-3 p-4 space-y-3">
        <h3 className="font-heading font-semibold text-sm">Map Legend</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span>Open Trails</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span>Restricted Access</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-error" />
            <span>Closed Trails</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
            <span>Active Alerts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyMap;