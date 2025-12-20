import Icon from '../../../components/AppIcon';
import { PlatformStats as StatsType } from '../types';

interface PlatformStatsProps {
  stats: StatsType;
}

const PlatformStats = ({ stats }: PlatformStatsProps) => {
  const statItems = [
    {
      icon: 'Mountain',
      value: stats.totalTreks.toLocaleString(),
      label: 'Total Treks',
      color: 'text-primary'
    },
    {
      icon: 'Users',
      value: stats.verifiedGuides.toLocaleString(),
      label: 'Verified Guides',
      color: 'text-secondary'
    },
    {
      icon: 'UserCheck',
      value: stats.communityMembers.toLocaleString(),
      label: 'Community Members',
      color: 'text-accent'
    },
    {
      icon: 'BookOpen',
      value: stats.storiesShared.toLocaleString(),
      label: 'Stories Shared',
      color: 'text-success'
    }
  ];

  return (
    <section className="py-16 px-4 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Trusted by Thousands
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Join our growing community of adventure seekers and local experts
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statItems.map((item, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4">
                <Icon name={item.icon} size={32} className="text-white" />
              </div>
              <p className="text-4xl md:text-5xl font-bold mb-2">
                {item.value}
              </p>
              <p className="text-primary-foreground/80 text-sm md:text-base">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;