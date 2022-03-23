import { Router } from 'express';

import { CreateSubscriptionController } from '@modules/projects/useCases/Subscriptions/create/CreateController';
import { FilterSubscriptionController } from '@modules/projects/useCases/Subscriptions/filter/FilterController';
import { FindSubscriptionController } from '@modules/projects/useCases/Subscriptions/find/FindController';
import { FindSubscriptionsByProjectController } from '@modules/projects/useCases/Subscriptions/findbyProject/FindController';
import { UpdateSubscriptionController } from '@modules/projects/useCases/Subscriptions/update/UpdateController';

import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const subscriptionsRoutes = Router();

const createSubscriptionsController = new CreateSubscriptionController();
const findSubscriptionsController = new FindSubscriptionController();
const updateSubscriptionsController = new UpdateSubscriptionController();
const filterSubscriptionsController = new FilterSubscriptionController();
const findSubscriptionsByProjectController = new FindSubscriptionsByProjectController();

subscriptionsRoutes.post('/', ensureAuthentication, createSubscriptionsController.handle);
subscriptionsRoutes.get('/find', findSubscriptionsController.handle);
subscriptionsRoutes.get('/', filterSubscriptionsController.handle);
subscriptionsRoutes.get('/byproject', findSubscriptionsByProjectController.handle);
subscriptionsRoutes.put('/', ensureAuthentication, updateSubscriptionsController.handle);

export { subscriptionsRoutes };
