import { CreateOrganizationController } from '@modules/organizations/useCases/Organization/create/CreateController';
import { FilterOrganizationController } from '@modules/organizations/useCases/Organization/filter/FilterController';
import { FindOrganizationController } from '@modules/organizations/useCases/Organization/find/FindController';
import { ListOrganizationController } from '@modules/organizations/useCases/Organization/list/ListController';
import { UpdateOrganizationController } from '@modules/organizations/useCases/Organization/update/UpdateController';
import { Router } from 'express';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const organizationsRoutes = Router();

const createOrganizationsController = new CreateOrganizationController();
const findOrganizationsController = new FindOrganizationController();
const updateOrganizationsController = new UpdateOrganizationController();
const listOrganizationsController = new ListOrganizationController();
const filterOrganizationsController = new FilterOrganizationController();

organizationsRoutes.post('/', ensureAuthentication, createOrganizationsController.handle );
organizationsRoutes.get('/find', ensureAuthentication, findOrganizationsController.handle );
organizationsRoutes.get('/filter', ensureAuthentication, filterOrganizationsController.handle );
organizationsRoutes.get('/', ensureAuthentication, listOrganizationsController.handle );
organizationsRoutes.put('/', ensureAuthentication, updateOrganizationsController.handle );

export { organizationsRoutes };