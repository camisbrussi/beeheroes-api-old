import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUseController';
import { Router } from 'express';

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post('/', createUserController.handle );

export { usersRoutes };