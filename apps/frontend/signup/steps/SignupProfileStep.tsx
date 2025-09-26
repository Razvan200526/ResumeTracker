import { Button } from '@common/components/button';
import { InputAvatar } from '@common/components/input/InputAvatar';
import { InputFirstName } from '@common/components/input/InputFirstName';
import { Toast } from '@common/components/toast';
import { isNameValid } from '@common/validators/isNameValid';
import { isUrlValid } from '@common/validators/isUrlValid';
import { Form } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useSignupStore } from '../signUpStore';
export const SignupProfileStep = () => {
  const { data, setStep, setData } = useSignupStore();

  const goBack = () => {
    setData({ ...data, password: '' });
    setStep(1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isUrlValid(data.image)) {
      Toast.error({
        description: 'User avatar is required',
      });
      return;
    }

    if (!isNameValid(data.firstName)) {
      Toast.error({
        description: 'Enter a valid first name',
      });
      return;
    }

    if (!isNameValid(data.lastName)) {
      Toast.error({
        description: 'Enter a valid last name',
      });
      return;
    }

    setStep(3);
  };

  return (
    <Form
      className="flex flex-col items-center justify-center gap-8"
      validationBehavior="aria"
      autoComplete="off"
      onSubmit={handleSubmit}
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

      {/*<InputLastName
        name="lastName"
        value={data.lastName}
        required
        placeholder={trans(dict.input.lastName.placeholder)}
        label={trans(dict.lastName)}
        onChange={(value) => setData({ ...data, lastName: value })}
      />*/}

      <div className="flex w-full gap-4">
        <Button
          type="button"
          variant="bordered"
          className="flex-1"
          startContent={
            <Icon icon="guidance:right-arrow" className="size-4.5" />
          }
          onPress={goBack}
        >
          Password
        </Button>
      </div>
    </Form>
  );
};
