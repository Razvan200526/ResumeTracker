import { PlusIcon } from '@heroicons/react/24/outline';

import { useImperativeHandle, useState } from 'react';
import { Button } from '../button';
import { Input } from './Input';

export type InputTextRefType = {
  getValue: () => string;
  setValue: (value: string) => void;
  isValid: () => boolean;
  getErrorMessage: () => string;
};

export type InputChatProps = {
  name?: string;
  size?: 'sm' | 'md';
  placeholder?: string;
  label?: string;
  value?: string;
  required?: boolean;
  isRequired?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  ref?: React.RefObject<InputTextRefType | null>;
};

export const InputChat = ({
  name,
  size,
  placeholder,
  label,
  value,
  required,
  isRequired,
  className,
  onChange,
  ref,
}: InputChatProps) => {
  const [initialValue, setValue] = useState(value || '');

  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return initialValue;
      },
      setValue(value: string) {
        setValue(value);
      },
      isValid() {
        return initialValue.trim() !== '';
      },
      getErrorMessage() {
        if (!initialValue.trim()) {
          return 'errors.text.required';
        }

        return '';
      },
    };
  }, [initialValue]);

  return (
    <>
      <Button className="ml-2" isIconOnly={true} variant="light" radius="full">
        <PlusIcon className=" size-3.5 text-primary" />
      </Button>
      <Input
        inputWrapperClassName="border-none"
        inputClassName="text-primary font-primary text-xs"
        size={size}
        name={name}
        type="text"
        placeholder={placeholder}
        label={label}
        className={className}
        value={initialValue}
        isRequired={isRequired || required}
        onChange={(value) => {
          setValue(value);
          onChange?.(value);
        }}
      />
    </>
  );
};
