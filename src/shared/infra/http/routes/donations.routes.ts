import { Router } from 'express';

import { CreateDonationController } from '@modules/donations/useCases/Donation/create/CreateController';
import { FilterDonationController } from '@modules/donations/useCases/Donation/filter/FilterController';
import { FindDonationController } from '@modules/donations/useCases/Donation/find/FindController';
import { UpdateDonationController } from '@modules/donations/useCases/Donation/update/UpdateController';

import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const donationsRoutes = Router();

const createDonationsController = new CreateDonationController();
const findDonationsController = new FindDonationController();
const updateDonationsController = new UpdateDonationController();
const filterDonationsController = new FilterDonationController();

donationsRoutes.post('/', ensureAuthentication, createDonationsController.handle);

donationsRoutes.get('/find', findDonationsController.handle);
donationsRoutes.get('/', filterDonationsController.handle);
donationsRoutes.post('/filter', filterDonationsController.handle);
donationsRoutes.put('/', ensureAuthentication, updateDonationsController.handle);

export { donationsRoutes };
