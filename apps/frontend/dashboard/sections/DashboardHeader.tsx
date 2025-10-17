import { H4 } from '@common/components/typography';

export const DashboardHeader = () => {
  return (
    <nav className="px-4 py-4 flex flex-row items-center justify-between w-full border-b border-border bg-background">
      <H4 className="text-primary">Dashboard</H4>
    </nav>
  );
};
