import { Router } from 'express';

import { CreatePermissionController } from '@modules/accounts/useCases/Permission/create/CreateController';
import { DeletePermissionController } from '@modules/accounts/useCases/Permission/delete/DeleteController';
import { FindPermissionController } from '@modules/accounts/useCases/Permission/find/FindController';
import { ListPermissionController } from '@modules/accounts/useCases/Permission/list/ListController';
import { UpdatePermissionController } from '@modules/accounts/useCases/Permission/update/UpdateController';

import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const permissionsRoutes = Router();

const createPermissionController = new CreatePermissionController();
const listPermissionController = new ListPermissionController();
const updatePermissionController = new UpdatePermissionController();
const findPermissionController = new FindPermissionController();
const deletePermissionController = new DeletePermissionController();

permissionsRoutes.post('/', createPermissionController.handle);
permissionsRoutes.get('/', ensureAuthentication, listPermissionController.handle);
permissionsRoutes.get('/find', ensureAuthentication, findPermissionController.handle);
permissionsRoutes.put('/', ensureAuthentication, updatePermissionController.handle);
permissionsRoutes.delete('/', ensureAuthentication, deletePermissionController.handle);

export { permissionsRoutes };
