import { Button } from '@common/components/button';
import {
  Dropdown,
  type DropdownItemDataType,
} from '@common/components/Dropdown';
import { EmptyChat } from '@common/components/EmptyChat';
import { InputChat } from '@common/components/input/InputChat';
import { MessageSkeleton } from '@common/components/MessageSkeleton';
import { Typewriter } from '@common/components/StreamingText';
import { SuggestionsList } from '@common/components/SuggestionsList';
import { SuggestionsListSkeleton } from '@common/components/SuggestionsListSkeleton';
import { Toast } from '@common/components/toast';
import { H6 } from '@common/components/typography';
import { AiChatIcon } from '@common/icons/AiChatIcon';
import { MessageIcon } from '@common/icons/MessageIcon';
import { MoreIcon } from '@common/icons/MoreIcon';
import { formatDate } from '@common/utils';
import { backend } from '@frontend/shared/backend';
import { useAuth } from '@frontend/shared/hooks';
import { Avatar, cn, ScrollShadow, Tab, Tabs } from '@heroui/react';
import { Icon } from '@iconify/react';
import type { ResponseType, ResumeType } from '@sdk/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  useChatMessages,
  useCreateChatSession,
  useGetChatSession,
} from '../hooks';
import { useResumeSuggestions, useSendMessage } from './hooks';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const ResumeChat = ({ resume }: { resume: ResumeType }) => {
  const [suggestions, setSuggestions] = useState<any | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>('chat');
  const [currentAbortController, setCurrentAbortController] =
    useState<AbortController | null>(null);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const hasFetchedSuggestionsRef = useRef(false);

  const { mutateAsync: sendMessage, isPending } = useSendMessage('resume');
  const { mutateAsync: createChatSession } = useCreateChatSession();
  const { data: user } = useAuth();

  // Try to get existing chat session for this resume
  const { data: existingSession } = useGetChatSession('resume', resume.id);

  // Get messages for the current session
  const { data: chatMessages, refetch: refetchMessages } = useChatMessages(
    currentSessionId || '',
  );

  const {
    refetch: resumeSuggestions,
    isFetching,
    isError,
    isLoadingError,
  } = useResumeSuggestions();

  // Load existing session and messages when component mounts
  useEffect(() => {
    if (existingSession?.id) {
      setCurrentSessionId(existingSession.id);
    }
  }, [existingSession]);

  useEffect(() => {
    if (chatMessages) {
      setMessages(chatMessages);
    }
  }, [chatMessages]);

  // Create session when first message is sent
  const ensureSessionExists = async () => {
    if (!currentSessionId && !existingSession?.id) {
      try {
        const newSession = await createChatSession({
          resourceType: 'resume',
          resourceId: resume.id,
          resourceName: resume.name,
        });
        setCurrentSessionId(newSession.id);
        return newSession.id;
      } catch (error) {
        console.error('Failed to create chat session:', error);
        return null;
      }
    }
    return currentSessionId || existingSession?.id;
  };

  if (isError || isLoadingError) {
    Toast.error({ description: 'Failed to load suggestions' });
  }

  const handleGetSuggestions = useCallback(async () => {
    try {
      const res = await resumeSuggestions();
      setSuggestions(res.data);
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
      Toast.error({ description: 'Failed to load suggestions' });
    }
  }, [resumeSuggestions]);

  const handleRefresh = () => {
    if (selectedTab === 'suggestions') {
      hasFetchedSuggestionsRef.current = false;
      handleGetSuggestions();
    } else if (selectedTab === 'chat') {
      setMessages([]);
      Toast.success({ description: 'Chat cleared locally' });
    }
  };

  useEffect(() => {
    if (
      selectedTab === 'suggestions' &&
      !suggestions &&
      !hasFetchedSuggestionsRef.current
    ) {
      hasFetchedSuggestionsRef.current = true;
      handleGetSuggestions();
    }
  }, [selectedTab, handleGetSuggestions, suggestions]);

  const handleStopResponse = () => {
    if (currentAbortController) {
      currentAbortController.abort();
      setCurrentAbortController(null);
      setIsGeneratingResponse(false);
      Toast.info({ description: 'Response stopped' });
    }
  };

  const handleSubmit = async (messageText: string) => {
    // Ensure we have a session
    const sessionId = await ensureSessionExists();
    if (!sessionId) {
      Toast.error({ description: 'Failed to create chat session' });
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: messageText,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Save user message to database
    try {
      await backend.chat.messages.create({
        sessionId,
        content: messageText,
        sender: 'user',
      });
    } catch (error) {
      console.error('Failed to save user message:', error);
      // Continue even if saving fails, as the message is already in local state
    }

    setIsGeneratingResponse(true);
    const abortController = new AbortController();
    setCurrentAbortController(abortController);

    try {
      const res = (await sendMessage(messageText)) as ResponseType<{
        ai_response: { text: string };
      }>;

      if (abortController.signal.aborted) {
        return;
      }

      if (!res) {
        Toast.error({ description: 'Failed to send message' });
        return;
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: res.data.ai_response.text,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Save AI response to database
      try {
        await backend.chat.messages.create({
          sessionId,
          content: res.data.ai_response.text,
          sender: 'ai',
        });
        // Optionally refetch messages to ensure consistency
        refetchMessages();
      } catch (error) {
        console.error('Failed to save AI message:', error);
        // Continue even if saving fails, as the message is already in local state
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      console.error(error);
      Toast.error({ description: 'Failed to send message' });
    } finally {
      setIsGeneratingResponse(false);
      setCurrentAbortController(null);
    }
  };

  const suggestionsText = suggestions?.data?.suggestions?.text;

  const items: DropdownItemDataType[] = [
    {
      key: 'edit',
      label: 'Edit',
      className:
        'text-resume data-[hover=true]:bg-resume/20 data-[hover=true]:text-resume',
      icon: <Icon icon="heroicons:pencil" className="size-4" />,
      shortcut: '⌘E',
    },
    {
      key: 'rename',
      label: 'Rename',
      className:
        'text-resume data-[hover=true]:bg-resume/20 data-[hover=true]:text-resume',
      icon: <Icon icon="heroicons:cursor-arrow-rays" className="size-4" />,
      shortcut: '⌘R',
    },
    {
      key: 'delete',
      label: 'Delete file',
      icon: <Icon icon="heroicons:trash" className="size-4" />,
      className:
        'text-danger data-[hover=true]:bg-danger/20 data-[hover=true]:text-danger',
      shortcut: '⌘⌫',
    },
  ];

  const tabItems = [
    {
      key: 'suggestions',
      label: 'Suggestions',
      icon: MessageIcon,
      className: 'text-resume data-[hover=true]:bg-resume/10',
      activeClassName: 'bg-resume/15 border-resume',
    },
    {
      key: 'chat',
      label: 'Chat',
      icon: AiChatIcon,
      className: 'text-resume data-[hover=true]:bg-resume/10',
      activeClassName: 'bg-resume/15 border-resume',
    },
  ];

  const activeTabItem = tabItems.find((item) => item.key === selectedTab);

  return (
    <ScrollShadow className="rounded border border-resume/20 h-full flex flex-col overflow-y-scroll">
      <nav className="px-4 py-2 rounded sticky top-0 z-10 bg-light flex items-center justify-between border-b border-resume/20 flex-shrink-0">
        <div className="flex-col items-center">
          <H6 className="text-resume truncate">{resume.name}</H6>
          <p className="text-xs text-muted">
            Uploaded {formatDate(resume.uploadedAt)}
          </p>
        </div>

        <Tabs
          onSelectionChange={(key) => setSelectedTab(key as string)}
          selectedKey={selectedTab}
          classNames={{
            base: 'w-full px-4 py-1 flex justify-end',
            tabContent: 'text-primary',
            cursor: cn('rounded border-none', activeTabItem?.activeClassName),
            tab: cn(
              'rounded py-4 shadow-none',
              'border-none transition-all duration-300 data-[hover-unselected=true]:opacity-100',
            ),
            panel: 'p-0',
          }}
          aria-label="resume-tabs"
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
                    'flex items-center space-x-1 gap-2 font-medium',
                    item.className,
                  )}
                >
                  {item.icon && <item.icon className="size-4" />}
                  {item.label}
                </div>
              }
            />
          ))}
        </Tabs>

        <div className="flex items-center gap-2">
          <Button
            variant="light"
            isIconOnly={true}
            radius="full"
            onPress={handleRefresh}
            isLoading={selectedTab === 'suggestions' && isFetching}
            className="text-resume hover:bg-resume/10"
          >
            <Icon icon="heroicons:arrow-path" className="size-4" />
          </Button>
          <Dropdown
            items={items}
            trigger={
              <Button variant="light" isIconOnly={true} radius="full">
                <MoreIcon className="text-resume size-4" />
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
              <EmptyChat classname="text-resume" />
            )}
          </ScrollShadow>
        )}

        {selectedTab === 'chat' && (
          <div className="h-full flex flex-col">
            <ScrollShadow className="flex-1 p-4">
              {messages.length > 0 ? (
                <div className="space-y-1">
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
                          'p-3 border border-red-300 text-sm rounded-lg max-w-[80%] break-words overflow-wrap-anywhere',
                          msg.sender === 'user'
                            ? 'bg-resume text-white border-resume'
                            : 'bg-light border border-border text-primary',
                        )}
                      >
                        {msg.sender === 'ai' ? (
                          <Typewriter fullText={msg.content} />
                        ) : (
                          <p>{msg.content}</p>
                        )}
                      </div>
                      {msg.sender === 'user' && (
                        <div className="mt-1 flex-shrink-0 flex items-center justify-center">
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
                <EmptyChat classname="text-resume" />
              )}
            </ScrollShadow>
            <div className="mx-2 sticky bottom-4 z-10">
              <InputChat
                value={message}
                onChange={setMessage}
                placeholder="Ask here..."
                theme="resume"
                isPending={isGeneratingResponse || isPending}
                disabled={false}
                onSubmit={async () => {
                  if (!isGeneratingResponse && !isPending) {
                    await handleSubmit(message);
                    setMessage('');
                  }
                }}
                onStop={handleStopResponse}
                showStopButton={isGeneratingResponse || isPending}
              />
            </div>
          </div>
        )}
      </div>
    </ScrollShadow>
  );
};
