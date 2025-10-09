import { Button } from '@common/components/button';
import {
  Dropdown,
  type DropdownItemDataType,
} from '@common/components/Dropdown';
import { EmptyChat } from '@common/components/EmptyChat';
import { InputChat } from '@common/components/input/InputChat';

import { H6 } from '@common/components/typography';
import { MoreIcon } from '@common/icons/MoreIcon';
import { formatDate } from '@common/utils';
import { ScrollShadow } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { CoverLetterType } from '@sdk/types';

const items: DropdownItemDataType[] = [
  {
    key: 'edit',
    label: 'Edit',
    icon: <Icon icon="heroicons:pencil" className="size-4" />,
    shortcut: '⌘E',
  },
  {
    key: 'rename',
    label: 'Rename',
    icon: <Icon icon="heroicons:cursor-arrow-rays" className="size-4" />,
    shortcut: '⌘R',
  },
  {
    key: 'share',
    label: 'Share',
    icon: <Icon icon="heroicons:share" className="size-4" />,
    shortcut: '⌘S',
  },
  {
    key: 'delete',
    label: 'Delete',
    icon: <Icon icon="heroicons:trash" className="size-4" />,
    className: 'text-danger',
    shortcut: '⌘⌫',
  },
];

export const CoverLetterChat = ({
  coverletter,
}: {
  coverletter: CoverLetterType;
}) => {
  // const {
  //   data: suggestions,
  //   isFetching,
  //   isError,
  // } = useCoverLetterSuggestions();

  return (
    <div className="rounded border border-border h-full flex flex-col">
      <nav className="p-4 rounded sticky top-0 bg-light flex items-center justify-between border-b border-border flex-shrink-0">
        <div className="flex-col items-center">
          <H6 className="text-coverletter">{coverletter.name}</H6>
          <p className="text-xs text-muted">
            Uploaded {formatDate(coverletter.uploadedAt)}
          </p>
        </div>
        <div>
          <Dropdown
            items={items}
            trigger={
              <Button variant="light" isIconOnly={true} radius="full">
                <MoreIcon className="text-coverletter size-4" />
              </Button>
            }
          />
        </div>
      </nav>
      <ScrollShadow className="flex-1 m-2">
        <EmptyChat classname="text-coverletter" />
      </ScrollShadow>
      <div className="rounded-full m-2 bg-light flex items-center justify start">
        <InputChat />
      </div>
    </div>
  );
};
