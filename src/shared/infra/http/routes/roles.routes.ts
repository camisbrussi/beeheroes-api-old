import { Router } from 'express';

import { CreateRoleController } from '@modules/accounts/useCases/Role/create/CreateController';
import { DeleteRoleController } from '@modules/accounts/useCases/Role/delete/DeleteController';
import { FindRoleController } from '@modules/accounts/useCases/Role/find/FindController';
import { ListRolesController } from '@modules/accounts/useCases/Role/list/ListController';
import { UpdateRoleController } from '@modules/accounts/useCases/Role/update/UpdateController';
import { CreateRolePermissionController } from '@modules/accounts/useCases/RolePermission/create/CreateController';

import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const rolesRoutes = Router();

const createRoleController = new CreateRoleController();
const listRoleController = new ListRolesController();
const updateRoleController = new UpdateRoleController();
const findRoleController = new FindRoleController();
const deleteRoleController = new DeleteRoleController();
const createRolePermissionController = new CreateRolePermissionController();

rolesRoutes.post('/', ensureAuthentication, createRoleController.handle);
rolesRoutes.get('/', ensureAuthentication, listRoleController.handle);
rolesRoutes.get('/find', ensureAuthentication, findRoleController.handle);
rolesRoutes.put('/', ensureAuthentication, updateRoleController.handle);
rolesRoutes.delete('/', ensureAuthentication, deleteRoleController.handle);
rolesRoutes.post('/permissions', ensureAuthentication, createRolePermissionController.handle);

export { rolesRoutes };
