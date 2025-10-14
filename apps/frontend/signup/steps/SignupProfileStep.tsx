import { Button } from '@common/components/button';
import { InputAvatar } from '@common/components/input/InputAvatar';
import { InputFirstName } from '@common/components/input/InputFirstName';
import { Toast } from '@common/components/toast';
import { isNameValid } from '@common/validators/isNameValid';
import { backend } from '@frontend/shared/backend';
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/outline';
import { Form } from '@heroui/react';

import { useState } from 'react';
import { useSignupStore } from '../signUpStore';

export const SignupProfileStep = () => {
  const { data, setStep, setData } = useSignupStore();
  const [isLoading, setIsLoading] = useState(false);

  const goBack = () => {
    setData({ ...data, password: '' });
    setStep(1);
  };

  const handleSignup = async () => {
    if (!isNameValid(data.firstName)) {
      Toast.error({ description: 'Enter a valid first name' });
      return;
    }
    if (!isNameValid(data.lastName)) {
      Toast.error({ description: 'Enter a valid last name' });
      return;
    }

    setIsLoading(true);
    const response = await backend.auth.signup.email(data);
    setIsLoading(false);

    if (response.success) {
      setStep(3);
    } else {
      Toast.error({ description: response.message || 'Signup failed' });
    }
  };

  return (
    <Form
      className="flex flex-col items-center justify-center gap-8"
      validationBehavior="aria"
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        handleSignup();
      }}
    >
      <div className="flex w-full items-center justify-center">
        <InputAvatar
          value={data.image}
          onAvatarChange={(url) => {
            setData({ ...data, image: url });
          }}
        />
      </div>

      <InputFirstName
        name="firstName"
        value={data.firstName}
        required
        placeholder="First Name"
        label="First name"
        onChange={(value) => setData({ ...data, firstName: value })}
      />

      <InputFirstName
        name="lastName"
        value={data.lastName}
        required
        placeholder="Last Name"
        label="Last name"
        onChange={(value) => setData({ ...data, lastName: value })}
      />

      <div className="flex w-full gap-4">
        <Button
          type="button"
          variant="bordered"
          className="flex-1"
          startContent={<ArrowLeftCircleIcon className="size-4.5" />}
          onPress={goBack}
        >
          Password
        </Button>
        <Button
          type="submit"
          variant="solid"
          isLoading={isLoading}
          endContent={<ArrowRightCircleIcon className="size-4.5" />}
        >
          Create Account & Verify
        </Button>
      </div>
    </Form>
  );
};
