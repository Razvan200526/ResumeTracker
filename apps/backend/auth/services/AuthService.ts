import { betterAuth } from 'better-auth';
import { Pool } from 'node_modules/@types/pg';
import type { SignInModel } from '../models/SignInModel';
export class AuthService {
  private readonly databaseUrl: string;

  public async signIn(data: SignInModel, headers?: Headers) {
    const auth = this.getAuth();

    return await auth.api.signInEmail({
      returnHeaders: true,
      body: data,
      headers,
    });
  }

  public getAuth() {
    return betterAuth({
      database: new Pool({
        connectionString: this.databaseUrl,
      }),
      advanced: {
        database: {
          generateId: () => crypto.randomUUID(),
        },
        cookies: {
          session_token: {
            name: 'session-token',
          },
        },
        useSecureCookies: true,
      },
      emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: false, //todo add otp verification
      },
      user: {
        modelName: 'user',
        fields: {
          name: 'name',
          email: 'email',
          password: 'password',
          createdAt: 'createdAt',
          updatedAt: 'updatedAt',
          deletedAt: 'deletedAt',
        },
        additionalFields: {
          firstname: {
            fieldName: 'first_name',
            type: 'string',
            required: true,
          },
          lastname: {
            fieldName: 'last_name',
            type: 'string',
            required: true,
          },
        },
      },
      session: {
        modelName: 'user-session',
        fields: {
          userId: 'user_id',
          token: 'token',
          expiresAt: 'expires_at',
          createdAt: 'created_at',
          updatedAt: 'updated_at',
        },
      },
      account: {
        modelName: 'user_accounts',
        fields: {
          userId: 'user_id',
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
    });
  }
}
