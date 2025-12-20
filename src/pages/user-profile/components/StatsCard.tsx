import Icon from '../../../components/AppIcon';
import { UserStats } from '../types';

interface StatsCardProps {
  stats: UserStats;
}

const StatsCard = ({ stats }: StatsCardProps) => {
  const statItems = [
    {
      icon: 'Mountain',
      label: 'Total Treks',
      value: stats.totalTreks.toString(),
      color: 'text-primary'
    },
    {
      icon: 'Route',
      label: 'Distance Covered',
      value: `${stats.totalDistance} km`,
      color: 'text-secondary'
    },
    {
      icon: 'TrendingUp',
      label: 'Elevation Gained',
      value: `${stats.totalElevation.toLocaleString()} m`,
      color: 'text-accent'
    },
    {
      icon: 'Calendar',
      label: 'Days Trekking',
      value: stats.totalDays.toString(),
      color: 'text-warning'
    },
    {
      icon: 'BookOpen',
      label: 'Stories Shared',
      value: stats.storiesShared.toString(),
      color: 'text-success'
    },
    {
      icon: 'Star',
      label: 'Reviews Written',
      value: stats.reviewsWritten.toString(),
      color: 'text-error'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-heading font-bold text-foreground mb-6">Trekking Statistics</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {statItems.map((item) => (
          <div key={item.label} className="flex flex-col items-center text-center">
            <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3 ${item.color}`}>
              <Icon name={item.icon} size={24} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{item.value}</div>
            <div className="text-sm text-muted-foreground">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCard;