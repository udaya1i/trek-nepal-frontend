import Icon from "../../../components/AppIcon";
import { TrekStats as TrekStatsType } from "../types";

interface TrekStatsProps {
  stats: TrekStatsType;
}

const difficultyConfig = {
  Easy: { color: "text-success", bg: "bg-success/10", icon: "TrendingUp" },
  Moderate: { color: "text-warning", bg: "bg-warning/10", icon: "Activity" },
  Hard: { color: "text-error", bg: "bg-error/10", icon: "Mountain" },
  Expert: { color: "text-destructive", bg: "bg-destructive/10", icon: "AlertTriangle" },
};

const TrekStats = ({ stats }: TrekStatsProps) => {
  const difficultyStyle = difficultyConfig[stats.difficulty];

  const statItems = [
    { icon: "Clock", label: "Duration", value: stats.duration },
    { icon: "TrendingUp", label: "Max Altitude", value: stats.maxAltitude },
    { icon: "Route", label: "Distance", value: stats.distance },
    { icon: "Calendar", label: "Best Season", value: stats.bestSeason },
    { icon: "Users", label: "Group Size", value: stats.groupSize },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Trek Statistics</h3>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${difficultyStyle.bg}`}>
          <Icon name={difficultyStyle.icon} size={16} className={difficultyStyle.color} />
          <span className={`text-sm font-medium ${difficultyStyle.color}`}>
            {stats.difficulty}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {statItems.map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={item.icon} size={20} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground mb-0.5">{item.label}</p>
              <p className="text-base font-medium text-foreground">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrekStats;