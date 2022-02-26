import { Router } from 'express';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';

import { CreateUserTypeController } from '@modules/accounts/useCases/UserType/create/CreateController';
import { ListUserTypesController } from '@modules/accounts/useCases/UserType/list/ListController';
import { UpdateUserTypeController } from '@modules/accounts/useCases/UserType/update/UpdateController';
import { FindUserTypeController } from '@modules/accounts/useCases/UserType/find/FindController';
import { DeleteUserTypeController } from '@modules/accounts/useCases/UserType/delete/DeleteController';

const userTypesRoutes = Router();

const createUserTypeController = new CreateUserTypeController();
const listUserTypeController = new ListUserTypesController();
const updateUserTypeController = new UpdateUserTypeController();
const findUserTypeController = new FindUserTypeController();
const deleteUserTypeController = new DeleteUserTypeController();

userTypesRoutes.post('/', ensureAuthentication, createUserTypeController.handle );
userTypesRoutes.get('/', ensureAuthentication, listUserTypeController.handle );
userTypesRoutes.get('/find', ensureAuthentication, findUserTypeController.handle);
userTypesRoutes.put('/',  ensureAuthentication, updateUserTypeController.handle);
userTypesRoutes.delete('/',  ensureAuthentication, deleteUserTypeController.handle);

export { userTypesRoutes };