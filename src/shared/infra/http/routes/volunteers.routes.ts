import { Router } from 'express';

import { CreateVolunteerController } from '@modules/accounts/useCases/Volunteer/create/CreateController';
import { CreateUserAndVolunteerController } from '@modules/accounts/useCases/Volunteer/createUserAndVolunteer/CreateController';
import { FilterVolunteerController } from '@modules/accounts/useCases/Volunteer/filter/FilterController';
import { FindVolunteerController } from '@modules/accounts/useCases/Volunteer/find/FindController';
import { UpdateVolunteerController } from '@modules/accounts/useCases/Volunteer/update/UpdateController';

import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const volunteersRoutes = Router();

const createVolunteersController = new CreateVolunteerController();
const findVolunteersController = new FindVolunteerController();
const updateVolunteersController = new UpdateVolunteerController();
const filterVolunteersController = new FilterVolunteerController();
const createUserAndVolunteerController = new CreateUserAndVolunteerController();

volunteersRoutes.post('/', ensureAuthentication, createVolunteersController.handle);
volunteersRoutes.get('/find', findVolunteersController.handle);
volunteersRoutes.post('/user', createUserAndVolunteerController.handle);
volunteersRoutes.get('/', filterVolunteersController.handle);
volunteersRoutes.put('/', ensureAuthentication, updateVolunteersController.handle);

export { volunteersRoutes };
