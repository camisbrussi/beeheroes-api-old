import { Router } from 'express';

import { CreateUserController } from '@modules/accounts/useCases/User/create/CreateController';
import { FilterUserController } from '@modules/accounts/useCases/User/filter/FilterController';
import { FindUserController } from '@modules/accounts/useCases/User/find/FindController';
import { ListUserController } from '@modules/accounts/useCases/User/list/ListUserController';
import { UpdateUserController } from '@modules/accounts/useCases/User/update/UpdateController';

import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const findUserController = new FindUserController();
const updateUserController = new UpdateUserController();
const listUserController = new ListUserController();
const filterUserController = new FilterUserController();

usersRoutes.post('/', ensureAuthentication, createUserController.handle);
usersRoutes.get('/find', ensureAuthentication, findUserController.handle);
usersRoutes.get('/filter', ensureAuthentication, filterUserController.handle);
usersRoutes.get('/', ensureAuthentication, listUserController.handle);
usersRoutes.put('/', ensureAuthentication, updateUserController.handle);

export { usersRoutes };
