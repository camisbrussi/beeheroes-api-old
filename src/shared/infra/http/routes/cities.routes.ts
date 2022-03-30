import { Router } from 'express';

import { ListCitiesController } from '@modules/addresses/useCases/address/listcities/list/ListController';
import { ListStatesController } from '@modules/addresses/useCases/address/liststates/list/ListController';

const citiesRoutes = Router();

const listCitiesController = new ListCitiesController();
const listStatesController = new ListStatesController();

citiesRoutes.get('/', listCitiesController.handle);
citiesRoutes.get('/states', listStatesController.handle);

export { citiesRoutes };
