import { Router } from 'express';

import { ListCitiesController } from '@modules/addresses/useCases/address/listcities/list/ListController';

const citiesRoutes = Router();

const listCitiesController = new ListCitiesController();

citiesRoutes.get('/', listCitiesController.handle);

export { citiesRoutes };
