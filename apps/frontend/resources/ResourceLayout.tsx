import { NumberChip } from '@common/components/chips/NumberChip';
import { H6 } from '@common/components/typography';

import { cn, Tab, Tabs } from '@heroui/react';
import { useQueryState } from 'nuqs';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import { CreateResourceDropdown } from './CreateResourceDropdown';

export const ResourceLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [tab, setTab] = useQueryState('resourceTab', {
    defaultValue: 'resume',
  });

  const fakeItems = [
    {
      key: 'resume',
      label: 'Resume',
      href: '.',
      content: 'Resume content',
      classname: 'text-resume data-[hover=true]:bg-resume/10',
      activeClassName: 'bg-resume/15 border-resume',
      count: 10,
    },
    {
      key: 'cover',
      label: 'Cover Letter',
      href: 'cover-letter',
      content: 'Cover Letter content',
      classname: 'text-cover data-[hover=true]:bg-cover/10',
      activeClassName: 'bg-cover/15 border-cover',
      count: 5,
    },
    {
      key: 'portfolio',
      label: 'Portfolio',
      href: 'portfolio',
      content: 'Portfolio content',
      classname: 'text-portfolio data-[hover=true]:bg-portfolio/10',
      activeClassName: 'bg-portfolio/15 border-portfolio',
      count: 3,
    },
  ];

  const handleSelectionChange = (key: string | number) => {
    const item = fakeItems.find((i) => i.key === key);
    if (item) {
      setTab(item.key);
      navigate(item.href);
    }
  };

  const activeTabKey =
    fakeItems.find((item) => {
      const pathEnd = location.pathname.split('/').pop();
      if (item.href === '.') {
        return pathEnd === 'resources';
      }
      return item.href === pathEnd;
    })?.key || 'Resume';

  const activeTabItem = fakeItems.find((item) => item.key === tab);
  return (
    <div className="h-[calc(100dvh)] flex flex-col">
      <nav className="px-4 py-2 bg-background flex flex-row items-center justify-between w-full border-b border-border">
        <H6 className="text-base font-primary">Resources</H6>
        <Tabs
          onSelectionChange={handleSelectionChange}
          selectedKey={activeTabKey}
          classNames={{
            base: 'w-full px-4 py-1',
            tabContent: 'text-primary',
            cursor: cn('rounded border-none', activeTabItem?.activeClassName),
            tab: cn(
              'rounded data-[hover-unselected=true]:bg-primary-100/80 py-4 shadow-none',
              'border-none transition-all duration-300 data-[hover-unselected=true]:opacity-100',
            ),
            panel: 'p-0',
          }}
          aria-label="resource-tabs"
          variant="light"
          radius="sm"
          size="sm"
        >
          {fakeItems.map((item) => (
            <Tab
              key={item.key}
              title={
                <div
                  className={cn(
                    'flex items-center space-x-1 font-medium',
                    item.classname,
                  )}
                >
                  <NavLink to={item.href}>{item.label}</NavLink>
                  {item.count && (
                    <NumberChip
                      className={cn(item.activeClassName, `text-${item.key}`)}
                      value={item.count}
                    />
                  )}
                </div>
              }
            />
          ))}
        </Tabs>
        <CreateResourceDropdown />
      </nav>
      <div className="flex-1 min-h-0">
        <Outlet />
      </div>
    </div>
  );
};
