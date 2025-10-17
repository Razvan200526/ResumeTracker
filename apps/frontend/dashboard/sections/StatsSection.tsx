import { StatsCard } from '../components/StatsCard';

export const StatsSection = () => {
  const quickStats = [
    {
      label: 'Total Applications',
      value: 142,
      change: '+12',
      trend: 'up' as const,
    },
    {
      label: 'Response Rate',
      value: '32%',
      change: '+5%',
      trend: 'up' as const,
    },
    {
      label: 'Interviews Scheduled',
      value: 18,
      change: '+3',
      trend: 'up' as const,
    },
    { label: 'This Week', value: 8, change: '-2', trend: 'down' as const },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {quickStats.map((stat, index) => (
        <StatsCard
          key={index}
          label={stat.label}
          value={stat.value}
          change={stat.change}
          trend={stat.trend}
        />
      ))}
    </div>
  );
};
