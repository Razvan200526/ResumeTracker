import { Button } from '@common/components/button';
import { cn, Input as HeroInput, type InputProps } from '@heroui/react';
import { Icon } from '@iconify/react';
import { forwardRef } from 'react';

export type InputChatProps = Omit<
  InputProps,
  'variant' | 'radius' | 'size' | 'onChange'
> & {
  size?: 'sm' | 'md';
  inputClassName?: string;
  inputWrapperClassName?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  isPending?: boolean;
  theme?: 'resume' | 'coverletter' | 'portfolio';
};

export const InputChat = forwardRef<HTMLInputElement, InputChatProps>(
  (props, ref) => {
    const {
      size = 'sm',
      className,
      inputClassName,
      inputWrapperClassName,
      onChange,
      onSubmit,
      isPending = false,
      theme = 'coverletter',
      value,
      ...rest
    } = props;

    const themeColors = {
      resume: {
        text: 'text-resume',
        placeholder: 'placeholder-resume/50',
        border: 'border-resume/20',
        borderHover: 'data-[hover=true]:border-resume',
        borderFocus: 'data-[focus=true]:border-resume',
        button: 'text-resume',
      },
      coverletter: {
        text: 'text-coverletter',
        placeholder: 'placeholder-coverletter/50',
        border: 'border-coverletter/20',
        borderHover: 'data-[hover=true]:border-coverletter',
        borderFocus: 'data-[focus=true]:border-coverletter',
        button: 'text-coverletter',
      },
      portfolio: {
        text: 'text-portfolio',
        placeholder: 'placeholder-portfolio/50',
        border: 'border-portfolio/20',
        borderHover: 'data-[hover=true]:border-portfolio',
        borderFocus: 'data-[focus=true]:border-portfolio',
        button: 'text-portfolio',
      },
    };

    const colors = themeColors[theme];

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onSubmit?.();
      }
    };

    return (
      <HeroInput
        ref={ref}
        type="text"
        {...rest}
        size={size}
        radius="lg"
        variant="bordered"
        autoComplete="off"
        value={value}
        onKeyDown={handleKeyDown}
        startContent={
          <Icon
            icon="heroicons:chat-bubble-oval-left"
            className={cn('size-4', `${colors.text}/70`)}
          />
        }
        endContent={
          <Button
            type="button"
            isIconOnly
            size="sm"
            variant="light"
            isDisabled={isPending || !value?.toString().trim()}
            className={colors.button}
            onPress={onSubmit}
          >
            <Icon
              icon={
                isPending ? 'heroicons:arrow-path' : 'heroicons:paper-airplane'
              }
              className={cn('size-4', isPending && 'animate-spin')}
            />
          </Button>
        }
        classNames={{
          base: cn('w-full border-none shadow-none', className),
          input: [
            'bg-light font-medium shadow-none placeholder:font-normal',
            'selection:bg-primary selection:text-primary-50 border-none',
            size === 'sm' ? 'text-sm' : 'text-base',
            size === 'sm' ? 'placeholder:text-xs' : 'placeholder:text-sm',
            colors.text,
            colors.placeholder,
            'font-semibold',
            inputClassName,
          ],
          inputWrapper: cn(
            'relative rounded-xl border bg-light shadow-none',
            'flex items-center gap-2 px-3 py-2',
            colors.border,
            colors.borderHover,
            colors.borderFocus,
            inputWrapperClassName,
          ),
        }}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
      />
    );
  },
);

InputChat.displayName = 'InputChat';
