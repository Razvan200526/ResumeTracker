import { ForgetPasswordEmailCheckMailer } from '@backend/auth/mailers/ForgetPasswordEmailCheckMailer';
import { SignupEmailCheckMailer } from '@backend/auth/mailers/SignupEmailCheckMailer';
import { random } from '@common/utils';
import { betterAuth } from 'better-auth';
import { emailOTP } from 'better-auth/plugins';
import { Pool } from 'pg';

export const AUTH_SESSION_TOKEN_NAME = 'auth-session-token';

export class AuthService {
  constructor(private readonly databaseUrl: string) {}

  public getAuth() {
    return betterAuth({
      database: new Pool({
        connectionString: this.databaseUrl,
      }),
      advanced: {
        database: {
          generateId: () => random.nanoid(15),
        },
        cookies: {
          session_token: {
            name: AUTH_SESSION_TOKEN_NAME,
            attributes: {},
          },
        },
        useSecureCookies: true,
      },
      emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: false,
      },
      user: {
        modelName: 'users',
        fields: {
          name: 'name',
          email: 'email',
          password: 'password',
          emailVerified: 'is_email_verified',
          image: 'image',
          createdAt: 'created_at',
          updatedAt: 'updated_at',
        },
        additionalFields: {
          firstName: {
            fieldName: 'first_name',
            type: 'string',
            required: true,
          },
          lastName: { fieldName: 'last_name', type: 'string', required: true },
          // You can add more optional fields later as your schema supports them
        },
      },
      session: {
        modelName: 'user_sessions',
        fields: {
          userId: 'user_id',
          token: 'token',
          expiresAt: 'expires_at',
          ipAddress: 'ip_address',
          userAgent: 'user_agent',
          createdAt: 'created_at',
          updatedAt: 'updated_at',
        },
      },
      account: {
        modelName: 'user_accounts',
        fields: {
          userId: 'user_id',
          providerId: 'provider_id',
          accountId: 'account_id',
          password: 'password',
          accessToken: 'access_token',
          accessTokenExpiresAt: 'access_token_expires_at',
          refreshToken: 'refresh_token',
          refreshTokenExpiresAt: 'refresh_token_expires_at',
          expiresAt: 'expires_at',
          scope: 'scope',
          idToken: 'id_token',
          createdAt: 'created_at',
          updatedAt: 'updated_at',
        },
      },
      verification: {
        modelName: 'user_verifications',
        fields: {
          identifier: 'identifier',
          value: 'value',
          expiresAt: 'expires_at',
          createdAt: 'created_at',
          updatedAt: 'updated_at',
        },
      },
      plugins: [
        emailOTP({
          otpLength: 6,
          expiresIn: 3600,
          allowedAttempts: 5,
          overrideDefaultEmailVerification: true,
          sendVerificationOTP: async ({ email, otp, type }) => {
            try {
              if (type === 'email-verification') {
                const mailer = new SignupEmailCheckMailer();
                await mailer.send({ to: email, otp, lang: 'en' });
              } else if (type === 'sign-in') {
                // optional: send sign-in OTP via email if you enable that flow
                // For now, no action (parity with azurite's comment)
              } else {
                const mailer = new ForgetPasswordEmailCheckMailer();
                await mailer.send({ to: email, otp, lang: 'en' });
              }
            } catch (e) {
              if (process.env.NODE_ENV !== 'production') {
                console.error('Failed to send OTP email:', e);
              }
            }
          },
        }),
      ],
    });
  }

  public async signup(
    data: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      image?: string;
    },
    headers?: Headers,
  ) {
    const auth = this.getAuth();
    return await auth.api.signUpEmail({
      returnHeaders: true,
      body: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        // Optional fields only if your schema supports them
        image: data.image,
      },
      headers,
    });
  }

  public async sendVerificationEmail(email: string, headers?: Headers) {
    const auth = this.getAuth();
    return await auth.api.sendVerificationOTP({
      returnHeaders: true,
      body: { email, type: 'email-verification' },
      headers,
    });
  }

  public async verifyEmailOTP(email: string, otp: string, headers?: Headers) {
    const auth = this.getAuth();
    return await auth.api.verifyEmailOTP({
      returnHeaders: true,
      body: { email, otp },
      headers,
    });
  }

  public async sendForgetPasswordEmail(email: string, headers?: Headers) {
    const auth = this.getAuth();
    return await auth.api.forgetPasswordEmailOTP({
      returnHeaders: true,
      body: { email },
      headers,
    });
  }

  public async resetPassword(
    data: {
      email: string;
      otp: string;
      password: string;
    },
    headers?: Headers,
  ) {
    const auth = this.getAuth();
    return await auth.api.resetPasswordEmailOTP({
      returnHeaders: true,
      body: data,
      headers,
    });
  }

  public async signInEmail(
    data: { email: string; password: string },
    headers?: Headers,
  ) {
    const auth = this.getAuth();
    return await auth.api.signInEmail({
      returnHeaders: true,
      body: data,
      headers,
    });
  }

  public async signOut(headers: Headers) {
    const auth = this.getAuth();
    try {
      const result = await auth.api.signOut({ headers });
      return result;
    } catch (e) {
      console.error('Sign out failed:', e);
      throw e;
    }
  }

  public async getSession(headers: Headers) {
    const auth = this.getAuth();
    try {
      return await auth.api.getSession({ headers });
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

export const authService = new AuthService(Bun.env.DATABASE_URL || '');
