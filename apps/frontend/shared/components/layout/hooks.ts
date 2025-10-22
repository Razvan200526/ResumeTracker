import { AiChatIcon } from '@common/icons/AiChatIcon';
import { ApplicationsIcon } from '@common/icons/ApplicationsIcon';
import { DashboardIcon } from '@common/icons/DashboardIcon';
import { ResourceIcon } from '@common/icons/ResourceIcon';
import { SettingsIcon } from '@common/icons/SettingsIcon';

export const useSideBarItems = () => {
  // const { id } = useParams();

  const mainItems = [
    {
      key: 'Dashboard',
      icon: DashboardIcon,
      href: 'dashboard',
      title: 'Dashboard',
    },
    {
      key: 'Resources',
      icon: ResourceIcon,
      href: 'resources',
      title: 'Resources',
    },
    {
      key: 'applications',
      href: 'applications',
      icon: ApplicationsIcon,
      title: 'Applications',
    },
    {
      key: 'settings',
      href: 'settings',
      icon: SettingsIcon,
      title: 'Settings',
    },
  ];

  const secondaryItems = [
    {
      key: 'ask',
      href: '/ask',
      icon: AiChatIcon,
      title: 'ask',
    },
  ];

  return { secondaryItems, mainItems };
};
