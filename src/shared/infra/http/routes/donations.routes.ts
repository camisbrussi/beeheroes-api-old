import { Router } from 'express';

import { CreateDonationController } from '@modules/donations/useCases/Donation/create/CreateController';
import { FilterDonationController } from '@modules/donations/useCases/Donation/filter/FilterController';
import { FindDonationController } from '@modules/donations/useCases/Donation/find/FindController';
import { ListDonationController } from '@modules/donations/useCases/Donation/list/ListController';
import { UpdateDonationController } from '@modules/donations/useCases/Donation/update/UpdateController';

import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const donationsRoutes = Router();

const createDonationsController = new CreateDonationController();
const findDonationsController = new FindDonationController();
const updateDonationsController = new UpdateDonationController();
const listDonationsController = new ListDonationController();
const filterDonationsController = new FilterDonationController();

donationsRoutes.post('/', ensureAuthentication, createDonationsController.handle);

donationsRoutes.get('/find', ensureAuthentication, findDonationsController.handle);
donationsRoutes.get('/filter', ensureAuthentication, filterDonationsController.handle);
donationsRoutes.get('/', ensureAuthentication, listDonationsController.handle);
donationsRoutes.put('/', ensureAuthentication, updateDonationsController.handle);

export { donationsRoutes };
