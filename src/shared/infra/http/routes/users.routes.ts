import { Router } from 'express';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';

import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUseController';

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post('/', ensureAuthentication, createUserController.handle );

export { usersRoutes };