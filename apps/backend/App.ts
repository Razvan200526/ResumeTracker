import { Hono } from 'hono';
import { cors } from 'hono/cors';
// import { jwt } from 'hono/jwt'; // Import jwt
import { logger } from 'hono/logger';
import { CreateUserSessionController } from './auth/controllers/CreateUserSessionControllers';
import { RetrieveSessionController } from './auth/controllers/RetrieveSessionController';
import { SignInController } from './auth/controllers/SigninController';
import { SignoutController } from './auth/controllers/SignoutController';
import { SignupCheckOtpController } from './auth/controllers/SignupCheckOtpController';
import { SignupEmailController } from './auth/controllers/SignupEmailController';
import { CreateChatMessageController } from './controllers/CreateChatMessageController';
import { CreateChatSessionController } from './controllers/CreateChatSessionController';
import { DeleteCoverletterController } from './controllers/DeleteCoverletterController';
import { DeleteResumeController } from './controllers/DeleteResumesController';
import { GetChatMessagesController } from './controllers/GetChatMessagesController';
import { GetChatSessionByResourceController } from './controllers/GetChatSessionByResourceController';
import { GetChatSessionsController } from './controllers/GetChatSessionController';
import { GetCoverletterController } from './controllers/GetCoverletterController';
import { GetResumeController } from './controllers/GetResumeController';
import { GetUserCoverlettersController } from './controllers/GetUserCoverlettersController';
import { GetUserResumeController } from './controllers/GetUserResumesController';
import { UploadAvatarController } from './controllers/UploadAvatarController';
import { UploadCoverLetterController } from './controllers/UploadCoverLetterController';
import { UploadResumeController } from './controllers/UploadResumeController';
import { CheckUserExistsController } from './controllers/UserExistsController';
import { authMiddleware } from './middleware/authMiddleware';
import { registerController } from './shared/registerController';

export const app = new Hono();
app.use(logger());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://pub-6858952ca1f64c08a3e778080d6e2ee6.r2.dev',
    ],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

// Register auth routes mirroring azurite
registerController(app, SignupEmailController);
registerController(app, SignupCheckOtpController);
registerController(app, SignInController);
registerController(app, CheckUserExistsController);

app.use('/api/auth/session', authMiddleware);
registerController(app, RetrieveSessionController);
registerController(app, CreateUserSessionController);
registerController(app, SignoutController);

// Protected routes (require authentication)
app.use('/api/chat/*', authMiddleware);
app.use('/api/resumes/*', authMiddleware);
app.use('/api/coverletter/*', authMiddleware);
app.use('/api/coverletters/*', authMiddleware);

//@ts-ignore trust-me
registerController(app, UploadAvatarController);
registerController(app, UploadResumeController);
registerController(app, GetUserResumeController);
registerController(app, DeleteResumeController);
registerController(app, GetUserCoverlettersController);
registerController(app, UploadCoverLetterController);
registerController(app, DeleteCoverletterController);
registerController(app, GetCoverletterController);
registerController(app, GetResumeController);

// Chat controllers
registerController(app, GetChatSessionsController);
registerController(app, CreateChatSessionController);
registerController(app, GetChatSessionByResourceController);
registerController(app, GetChatMessagesController);
registerController(app, CreateChatMessageController);

app.post('/api/auth/signup', async (c) => {
  const ctrl = new SignupEmailController();
  return await ctrl.handler(c);
});

app.onError((err, c) => {
  return c.json({ success: false, error: err.message }, 500);
});

app.get('/health', (c) => c.json({ status: 'ok' }));
