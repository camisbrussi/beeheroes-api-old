import { Router } from 'express';

import { CreateVolunteerController } from '@modules/volunteers/useCases/Volunteer/create/CreateController';
import { FindVolunteerController } from '@modules/volunteers/useCases/Volunteer/find/FindController';
import { ListVolunteerController } from '@modules/volunteers/useCases/Volunteer/list/ListController';
import { UpdateVolunteerController } from '@modules/volunteers/useCases/Volunteer/update/UpdateController';

import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const volunteersRoutes = Router();

const createVolunteersController = new CreateVolunteerController();
const findVolunteersController = new FindVolunteerController();
const updateVolunteersController = new UpdateVolunteerController();
const listVolunteersController = new ListVolunteerController();

volunteersRoutes.post('/', ensureAuthentication, createVolunteersController.handle);
volunteersRoutes.get('/find', ensureAuthentication, findVolunteersController.handle);
volunteersRoutes.get('/', ensureAuthentication, listVolunteersController.handle);
volunteersRoutes.put('/', ensureAuthentication, updateVolunteersController.handle);

export { volunteersRoutes };
