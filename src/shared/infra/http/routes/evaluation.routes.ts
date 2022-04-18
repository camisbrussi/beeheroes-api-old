import { Router } from 'express';

import { CreateEvaluationController } from '@modules/projects/useCases/Evaluations/create/CreateController';
import { FindEvaluationController } from '@modules/projects/useCases/Evaluations/find/FindController';
import { FindEvaluationsByUserController } from '@modules/projects/useCases/Evaluations/findbyUser/FindController';
import { UpdateEvaluationController } from '@modules/projects/useCases/Evaluations/update/UpdateController';

import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const evaluationsRoutes = Router();

const createEvaluationsController = new CreateEvaluationController();
const findEvaluationsController = new FindEvaluationController();
const updateEvaluationsController = new UpdateEvaluationController();
const findEvaluationsByUserController = new FindEvaluationsByUserController();

evaluationsRoutes.post('/', ensureAuthentication, createEvaluationsController.handle);
evaluationsRoutes.put('/', ensureAuthentication, updateEvaluationsController.handle);
evaluationsRoutes.get('/find', findEvaluationsController.handle);
evaluationsRoutes.get('/user', findEvaluationsByUserController.handle);

export { evaluationsRoutes };
