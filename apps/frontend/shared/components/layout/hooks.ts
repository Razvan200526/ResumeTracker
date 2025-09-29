import { AiChatIcon } from '@common/icons/AiChatIcon';
import { FolderIcon } from '@common/icons/FolderIcon';
import { ResourceIcon } from '@common/icons/ResourceIcon';
import { SettingsIcon } from '@common/icons/SettingsIcon';

export const useSideBarItems = () => {
  // const { id } = useParams();

  const mainItems = [
    {
      key: 'Resources',
      icon: ResourceIcon,
      href: 'resources',
      title: 'Resources',
    },
    {
      key: 'applications',
      href: 'applications',
      icon: FolderIcon,
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
