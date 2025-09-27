import { Button } from '@common/components/button';
import { Tooltip } from '@common/components/Tooltip';
import { NotificationIcon } from '@common/icons/NotificationIcon';
import { useAppSidebarStore } from '@frontend/appStore';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export const Header = () => {
  const {
    close: closeSidebar,
    isMinimized,
    minimize: minimizeSidebar,
    expand: expandSidebar,
  } = useAppSidebarStore();

  const items = [
    {
      icon: <NotificationIcon className="size-4.5" />,
      content: 'Notifications',
    },
  ];

  return (
    <div className="flex items-center justify-between pt-2 pr-2">
      <div className="flex items-center gap-2 px-2">
        <div className="bg-foreground flex h-8 w-8 items-center justify-center rounded-full">
          {/*<Link to={'/'}>
            <AcmeIcon />
          </Link>*/}
        </div>
      </div>
      <div className="flex items-center justify-end gap-1.5">
        {isMinimized ? (
          <Tooltip content="Expand sidebar">
            <Button
              isIconOnly={true}
              className="rounded-full"
              variant="light"
              color="primary"
              onPress={() => {
                closeSidebar();
                expandSidebar();
              }}
            >
              <ChevronRightIcon className="size-4" />
            </Button>
          </Tooltip>
        ) : (
          <Tooltip content="Minimize sidebar">
            <Button
              isIconOnly={true}
              className="rounded-full"
              variant="light"
              color="primary"
              onPress={minimizeSidebar}
            >
              <ChevronLeftIcon className="size-4" />
            </Button>
          </Tooltip>
        )}

        {items.map((item, index) => (
          <Tooltip key={index} content={item.content}>
            <Button
              isIconOnly={true}
              className="rounded-full"
              variant="light"
              color="primary"
            >
              {item.icon}
            </Button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
