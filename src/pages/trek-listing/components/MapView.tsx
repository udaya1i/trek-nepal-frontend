import { Trek } from '../types';

interface MapViewProps {
  treks: Trek[];
}

const MapView = ({ treks }: MapViewProps) => {
  const centerLat = 28.3949;
  const centerLng = 84.124;

  return (
    <div className="w-full h-[calc(100vh-240px)] bg-card rounded-lg overflow-hidden border border-border">
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title="Nepal Treks Map"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${centerLat},${centerLng}&z=7&output=embed`}
        className="border-0"
      />
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-elevated max-w-xs">
        <p className="text-sm font-medium text-foreground mb-2">
          Showing {treks.length} treks
        </p>
        <p className="text-xs text-muted-foreground">
          Click on markers to view trek details
        </p>
      </div>
    </div>
  );
};

export default MapView;