import { Router } from 'express';

import { CreateOrganizationTypeController } from '@modules/organizations/useCases/OrganizationType/create/CreateController';
import { DeleteOrganizationTypeController } from '@modules/organizations/useCases/OrganizationType/delete/DeleteController';
import { FindOrganizationTypeController } from '@modules/organizations/useCases/OrganizationType/find/FindController';
import { ListOrganizationTypesController } from '@modules/organizations/useCases/OrganizationType/list/ListController';
import { UpdateOrganizationTypeController } from '@modules/organizations/useCases/OrganizationType/update/UpdateController';

import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const organizationTypesRoutes = Router();

const createOrganizationTypeController = new CreateOrganizationTypeController();
const listOrganizationTypeController = new ListOrganizationTypesController();
const updateOrganizationTypeController = new UpdateOrganizationTypeController();
const findOrganizationTypeController = new FindOrganizationTypeController();
const deleteOrganizationTypeController = new DeleteOrganizationTypeController();

organizationTypesRoutes.post('/', ensureAuthentication, createOrganizationTypeController.handle);
organizationTypesRoutes.get('/', listOrganizationTypeController.handle);
organizationTypesRoutes.get('/find', findOrganizationTypeController.handle);
organizationTypesRoutes.put('/', ensureAuthentication, updateOrganizationTypeController.handle);
organizationTypesRoutes.delete('/', ensureAuthentication, deleteOrganizationTypeController.handle);

export { organizationTypesRoutes };
