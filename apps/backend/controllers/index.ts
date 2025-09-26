import { app } from '@backend/App';
import { registerController } from '@backend/shared/registerController';
import { SignUpController } from './CreateUserController';
import { SignInController } from './SignInController';

registerController(app, SignUpController);
registerController(app, SignInController);
