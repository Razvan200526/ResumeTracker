import { Button } from '@common/components/button';
import { Card } from '@common/components/card';
import {
  InputEmail,
  type InputEmailRefType,
  InputPassword,
  type InputPasswordRefType,
} from '@common/components/input';
import { Link } from '@common/components/Link';
import { Toast } from '@common/components/toast';
import { H3 } from '@common/components/typography';
import { backend } from '@frontend/shared/backend';
import { Form } from '@heroui/react';
import type React from 'react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';

export const SigninPage = () => {
  const navigate = useNavigate();
  const emailRef = useRef<InputEmailRefType | null>(null);
  const passwordRef = useRef<InputPasswordRefType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailRef.current?.getValue() || '';
    const password = passwordRef.current?.getValue() || '';

    if (emailRef.current && !emailRef.current?.isValid()) {
      Toast.error({ description: emailRef.current?.getErrorMessage() });
      return;
    }

    if (passwordRef.current && !passwordRef.current?.isValid()) {
      Toast.error({
        description: passwordRef.current?.getErrorMessage(),
      });
      return;
    }

    setIsLoading(true);

    const response = await backend.auth.signin.email({
      email,
      password,
    });

    setTimeout(() => {
      setIsLoading(false);

      if (!response || !response.success) {
        Toast.error({
          description: 'Invalid email or password',
        });
        return;
      }
      if (response.data.data?.token && response.data.data.user) {
        backend.auth.setAuthToken(response.data.data?.token);
      }
      navigate('/home');
    }, 1000);
  };

  return (
    <div className="bg-background h-[calc(100dvh)] flex flex-col gap-8 items-center justify-center px-4 sm:px-6 pt-8">
      <H3>Sign In</H3>
      <Card className="w-full max-w-[480px] p-8 flex flex-col gap-8">
        <Form
          className="flex flex-col gap-8 justify-center items-center"
          validationBehavior="aria"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <InputEmail
            name="email"
            size="sm"
            required
            placeholder="Enter your email"
            label="Email"
            ref={emailRef}
          />

          <div className="flex flex-col gap-2 w-full items-end">
            <InputPassword
              name="password"
              size="sm"
              required
              placeholder="Enter your password"
              label="Password"
              ref={passwordRef}
            />
            <Link to="/reset-password" className="text-xs font-primary">
              Forgot Password?
            </Link>
          </div>

          <Button
            className="w-full font-primary"
            type="submit"
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </Form>
        <p className="text-center text-small font-primary flex items-center justify-center gap-1">
          Need to create an Account?
          <Link className="text-secondary-text" to="/signup">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
};
