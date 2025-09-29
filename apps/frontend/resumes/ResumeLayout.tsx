import { H6 } from '@common/components/typography';
import { cn, Tab, Tabs } from '@heroui/react';
import { useQueryState } from 'nuqs';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router';

export const ResourceLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [tab, setTab] = useQueryState('chatTab', {
    defaultValue: 'Resume',
  });

  const fakeItems = [
    {
      key: 'Resume',
      label: 'Resume',
      href: '.',
      content: 'Resume content',
      classname: 'text-primary data-[hover=true]:bg-primary/10',
      activeClassName: 'bg-primary/15 border-primary',
    },
    {
      key: 'Cover Letter',
      label: 'Cover Letter',
      href: 'cover-letter',
      content: 'Cover Letter content',
      classname: 'text-primary data-[hover=true]:bg-primary/10',
      activeClassName: 'bg-primary/15 border-primary',
    },
    {
      key: 'Portfolio',
      label: 'Portfolio',
      href: 'portfolio',
      content: 'Portfolio content',
      classname: 'text-primary data-[hover=true]:bg-primary/10',
      activeClassName: 'bg-primary/15 border-border',
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
    <div className="h-[calc(100dvh)] bg-background flex flex-col">
      <div className="px-4 bg-background flex flex-row items-center justify-between h-full border-b border-border">
        <H6 className="text-base font-primary">Resources</H6>
        <Tabs
          onSelectionChange={handleSelectionChange}
          selectedKey={activeTabKey}
          classNames={{
            base: 'w-full px-2 py-1',
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
                </div>
              }
              className="font-primary"
            />
          ))}
        </Tabs>
      </div>
      <div className="h-[calc(100dvh-5rem)]">
        <Outlet />
      </div>
    </div>
  );
};
