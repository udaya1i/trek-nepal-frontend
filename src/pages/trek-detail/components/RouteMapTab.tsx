import { useState } from "react";
import Icon from "../../../components/ui/AppIcon";
import Button from "../../../components/ui/Button";
import { RoutePoint, ElevationPoint } from "../types";

interface RouteMapTabProps {
  routePoints: RoutePoint[];
  elevationProfile: ElevationPoint[];
}

const RouteMapTab = ({ routePoints, elevationProfile }: RouteMapTabProps) => {
  const [mapView, setMapView] = useState<"map" | "elevation">("map");

  const handleDownloadGPX = () => {
    alert("GPX file download functionality would be implemented here");
  };

  const centerLat = routePoints.reduce((sum, point) => sum + point.lat, 0) / routePoints.length;
  const centerLng = routePoints.reduce((sum, point) => sum + point.lng, 0) / routePoints.length;

  const maxAltitude = Math.max(...elevationProfile.map((p) => p.altitude));
  const maxDistance = Math.max(...elevationProfile.map((p) => p.distance));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
          <button
            onClick={() => setMapView("map")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              mapView === "map" ?"bg-background text-foreground shadow-sm" :"text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon name="Map" size={16} className="inline mr-2" />
            Route Map
          </button>
          <button
            onClick={() => setMapView("elevation")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              mapView === "elevation" ?"bg-background text-foreground shadow-sm" :"text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon name="TrendingUp" size={16} className="inline mr-2" />
            Elevation Profile
          </button>
        </div>

        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
          onClick={handleDownloadGPX}
        >
          Download GPX
        </Button>
      </div>

      {mapView === "map" ? (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="w-full h-[500px]">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Trek Route Map"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${centerLat},${centerLng}&z=12&output=embed`}
              className="border-0"
            />
          </div>

          <div className="p-6 border-t border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Route Points</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {routePoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-muted rounded-lg"
                >
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground mb-1">{point.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {point.altitude}m altitude
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Elevation Profile
          </h3>

          <div className="relative w-full h-[400px] bg-muted rounded-lg p-4">
            <svg
              viewBox={`0 0 ${maxDistance + 20} ${maxAltitude + 500}`}
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="elevationGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              <polyline
                points={elevationProfile
                  .map((point) => `${point.distance},${maxAltitude - point.altitude + 200}`)
                  .join(" ")}
                fill="url(#elevationGradient)"
                stroke="var(--color-primary)"
                strokeWidth="3"
              />

              {elevationProfile.map((point, index) => (
                <g key={index}>
                  <circle
                    cx={point.distance}
                    cy={maxAltitude - point.altitude + 200}
                    r="5"
                    fill="var(--color-primary)"
                  />
                </g>
              ))}
            </svg>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {elevationProfile.map((point, index) => (
              <div key={index} className="text-center">
                <p className="text-sm text-muted-foreground mb-1">{point.location}</p>
                <p className="font-semibold text-foreground">{point.altitude}m</p>
                <p className="text-xs text-muted-foreground">{point.distance}km</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteMapTab;