import { Router } from 'express';

import { AuthenticationController } from '@modules/accounts/useCases/authentication/create/AuthenticationController';
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController';
import { MeController } from '@modules/accounts/useCases/User/me/MeController';

import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const authenticationRoutes = Router();

const authenticationController = new AuthenticationController();
const refreshTokenController = new RefreshTokenController();
const meController = new MeController();

authenticationRoutes.post('/sessions', authenticationController.handle);
authenticationRoutes.post('/refreshtoken', ensureAuthentication, refreshTokenController.handle);
authenticationRoutes.get('/me', ensureAuthentication, meController.handle);

export { authenticationRoutes };
