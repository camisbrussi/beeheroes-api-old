import { Router } from 'express';

import { CreateVolunteerController } from '@modules/accounts/useCases/Volunteer/create/CreateController';
import { FilterVolunteerController } from '@modules/accounts/useCases/Volunteer/filter/FilterController';
import { FindVolunteerController } from '@modules/accounts/useCases/Volunteer/find/FindController';
import { UpdateVolunteerController } from '@modules/accounts/useCases/Volunteer/update/UpdateController';

import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const volunteersRoutes = Router();

const createVolunteersController = new CreateVolunteerController();
const findVolunteersController = new FindVolunteerController();
const updateVolunteersController = new UpdateVolunteerController();
const filterVolunteersController = new FilterVolunteerController();

volunteersRoutes.post('/', ensureAuthentication, createVolunteersController.handle);
volunteersRoutes.get('/find', ensureAuthentication, findVolunteersController.handle);
volunteersRoutes.get('/', filterVolunteersController.handle);
volunteersRoutes.put('/', ensureAuthentication, updateVolunteersController.handle);

export { volunteersRoutes };
