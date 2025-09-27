import { AiChatIcon } from '@common/icons/AiChatIcon';
import { FolderIcon } from '@common/icons/FolderIcon';
import { ResourceIcon } from '@common/icons/ResourceIcon';
import { SettingsIcon } from '@common/icons/SettingsIcon';

export const useSideBarItems = () => {
  // const { id } = useParams();

  const mainItems = [
    {
      key: 'resources',
      href: '/',
      icon: ResourceIcon,
      title: 'Resources',
    },
    {
      key: 'folders',
      href: '',
      icon: FolderIcon,
      title: 'Folders',
    },
    {
      key: 'settings',
      href: '',
      icon: SettingsIcon,
      title: 'Settings',
    },
  ];

  const secondaryItems = [
    {
      key: 'ask',
      href: '',
      icon: AiChatIcon,
      title: 'ask',
    },
  ];

  return { secondaryItems, mainItems };
};
