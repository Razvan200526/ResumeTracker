import { Tabs } from '@heroui/react';

export const ApplicationsLayout = () => {
  return (
    <div className="border border-border min-h-screen bg-background">
      <nav className="absolute top-0 z-50 w-full rounded h-[calc(10dvh)] border-b border-border flex items-start justify-between">
        <Tabs />
      </nav>
    </div>
  );
};
