import { Button } from '@common/components/button';
import {
  Dropdown,
  type DropdownItemDataType,
} from '@common/components/Dropdown';
import { EmptyChat } from '@common/components/EmptyChat';
import { InputChat } from '@common/components/input/InputChat';
import { MessageSkeleton } from '@common/components/MessageSkeleton';

import { SuggestionsList } from '@common/components/SuggestionsList';
import { SuggestionsListSkeleton } from '@common/components/SuggestionsListSkeleton';
import { H6 } from '@common/components/typography';
import { AiChatIcon } from '@common/icons/AiChatIcon';
import { MessageIcon } from '@common/icons/MessageIcon';
import { MoreIcon } from '@common/icons/MoreIcon';
import { formatDate } from '@common/utils';
import { useAuth } from '@frontend/shared/hooks';
import { Avatar, cn, ScrollShadow, Tab, Tabs } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { CoverLetterType } from '@sdk/types';
import { useState } from 'react';
import { useCoverLetterSuggestions, useSendMessage } from '../resumes/hooks';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

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
  const [suggestions, setSuggestions] = useState<any | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>('chat');
  const { mutateAsync: sendMessage, isPending } = useSendMessage();
  const { data: user } = useAuth();
  const {
    refetch: coverLetterSuggestions,
    isFetching,
    isError,
  } = useCoverLetterSuggestions();
  const handleGetSuggestions = async () => {
    const res = await coverLetterSuggestions();
    setSuggestions(res.data);
  };

  const handleSubmit = async (messageText: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: messageText,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Send message and add AI response
    const res = await sendMessage(messageText);
    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      content: res.data?.ai_response.text,
      sender: 'ai',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMessage]);
  };
  if (isError) {
    throw new Error('Failed to fetch cover letter suggestions');
  }
  const suggestionsText = suggestions?.data?.suggestions?.text;

  const tabItems = [
    {
      key: 'suggestions',
      label: 'Suggestions',
      className: 'text-coverletter data-[hover=true]:bg-coverletter/10',
      activeClassName: 'bg-coverletter/15 border-coverletter',
    },
    {
      key: 'chat',
      label: 'Chat',
      className: 'text-coverletter data-[hover=true]:bg-coverletter/10',
      activeClassName: 'bg-coverletter/15 border-coverletter',
    },
  ];

  const activeTabItem = tabItems.find((item) => item.key === selectedTab);

  return (
    <ScrollShadow className="rounded border border-coverletter/20 h-full flex flex-col overflow-y-scroll">
      <nav className="px-4 py-2 rounded sticky top-0 z-10 bg-light flex items-center justify-between border-b border-coverletter/20 flex-shrink-0">
        <div className="flex-col items-center">
          <H6 className="text-coverletter truncate">{coverletter.name}</H6>
          <p className="text-xs text-muted">
            Uploaded {formatDate(coverletter.uploadedAt)}
          </p>
        </div>

        <Tabs
          onSelectionChange={(key) => setSelectedTab(key as string)}
          selectedKey={selectedTab}
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
          aria-label="coverletter-tabs"
          variant="light"
          radius="sm"
          size="sm"
        >
          {tabItems.map((item) => (
            <Tab
              key={item.key}
              title={
                <div
                  className={cn(
                    'flex items-center space-x-1 font-medium',
                    item.className,
                  )}
                >
                  {item.label}
                </div>
              }
            />
          ))}
        </Tabs>

        <div className="flex items-center">
          <Button
            variant="light"
            className="text-coverletter"
            startContent={<MessageIcon className="size-4" />}
            onPress={() => handleGetSuggestions()}
          >
            Get suggestions
          </Button>
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

      <div className="flex-1">
        {selectedTab === 'suggestions' && (
          <ScrollShadow className="h-full p-4 overflow-y-scroll">
            {isFetching ? (
              <SuggestionsListSkeleton />
            ) : suggestionsText ? (
              <SuggestionsList text={suggestionsText} />
            ) : (
              <EmptyChat classname="text-coverletter" />
            )}
          </ScrollShadow>
        )}

        {selectedTab === 'chat' && (
          <div className="h-full flex flex-col">
            <ScrollShadow className="flex-1 p-4">
              {messages.length > 0 ? (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        'flex gap-2',
                        msg.sender === 'user' ? 'justify-end' : 'justify-start',
                      )}
                    >
                      {msg.sender === 'ai' && (
                        <AiChatIcon className="size-5 text-primary mt-1 flex-shrink-0" />
                      )}
                      <div
                        className={cn(
                          'p-3 text-sm rounded-lg max-w-[80%]',
                          msg.sender === 'user'
                            ? 'bg-coverletter text-white border-coverletter'
                            : 'bg-background text-primary border-coverletter/10',
                        )}
                      >
                        {msg.sender === 'ai' ? (
                          <SuggestionsList text={msg.content} />
                        ) : (
                          <p>{msg.content}</p>
                        )}
                      </div>
                      {msg.sender === 'user' && (
                        <div className="mt-1 flex-shrink-0 bg-coverletter rounded-full flex items-center justify-center">
                          <Avatar src={user?.image} />
                        </div>
                      )}
                    </div>
                  ))}
                  {isPending && (
                    <div className="flex justify-start gap-2">
                      <AiChatIcon className="size-5 text-primary mt-1 flex-shrink-0" />
                      <MessageSkeleton className="text-primary" />
                    </div>
                  )}
                </div>
              ) : isPending ? (
                <div className="flex justify-start gap-2">
                  <AiChatIcon className="size-5 text-primary mt-1 flex-shrink-0" />
                  <MessageSkeleton className="text-primary" />
                </div>
              ) : (
                <EmptyChat classname="text-coverletter" />
              )}
            </ScrollShadow>
            <div className="mx-2 sticky bottom-4 z-10">
              <InputChat
                value={message}
                onChange={setMessage}
                placeholder="Ask here..."
                theme="coverletter"
                isPending={isPending}
                disabled={isPending}
                onSubmit={async () => {
                  await handleSubmit(message);
                  setMessage('');
                }}
              />
            </div>
          </div>
        )}
      </div>
    </ScrollShadow>
  );
};
