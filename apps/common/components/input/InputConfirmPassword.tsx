import { PasswordIcon } from '@common/icons/PasswordIcon';
import { isUserPasswordValid } from '@common/validators/isUserPasswordValid';
import { cn } from '@heroui/react';
import { useImperativeHandle, useState } from 'react';
import { Input } from './Input';

export type InputConfirmPasswordRefType = {
  getValue: () => string;
  setValue: (value: string) => void;
  isValid: () => boolean;
  getErrorMessage: () => string;
};

export type InputConfirmPasswordProps = {
  name?: string;
  size?: 'sm' | 'md';
  placeholder?: string;
  label?: string;
  value?: string;
  required?: boolean;
  isRequired?: boolean;
  className?: string;
  password: string;
  onChange?: (value: string) => void;
  ref?: React.RefObject<InputConfirmPasswordRefType | null>;
};

export const InputConfirmPassword = ({
  name,
  size,
  placeholder = 'Confirm your password',
  label = 'Confirm Password',
  value,
  required,
  isRequired,
  className,
  password,
  onChange,
  ref,
}: InputConfirmPasswordProps) => {
  const [initialValue, setValue] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);

  const icon = (
    <PasswordIcon
      className={cn(
        'size-4.5',
        isFocused || initialValue.length > 0
          ? 'text-primary'
          : 'text-border-hover',
      )}
    />
  );

  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return initialValue;
      },
      setValue(value: string) {
        setValue(value);
      },
      isValid() {
        return isUserPasswordValid(initialValue) && initialValue === password;
      },
      getErrorMessage() {
        if (!initialValue.trim()) {
          return 'errors.password.confirm.required';
        }

        if (initialValue !== password) {
          return 'errors.password.confirm.notMatching';
        }

        return '';
      },
    };
  }, [initialValue, password]);

  return (
    <Input
      size={size}
      name={name}
      startContent={icon}
      type="password"
      placeholder={placeholder}
      label={label}
      className={className}
      value={initialValue}
      isRequired={isRequired || required}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onChange={(value) => {
        setValue(value);
        onChange?.(value);
      }}
    />
  );
};
