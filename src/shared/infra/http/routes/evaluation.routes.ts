import { Router } from 'express';

import { CreateEvaluationController } from '@modules/projects/useCases/Evaluations/create/CreateController';
import { FindEvaluationController } from '@modules/projects/useCases/Evaluations/find/FindController';
import { UpdateEvaluationController } from '@modules/projects/useCases/Evaluations/update/UpdateController';

import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const evaluationsRoutes = Router();

const createEvaluationsController = new CreateEvaluationController();
const findEvaluationsController = new FindEvaluationController();
const updateEvaluationsController = new UpdateEvaluationController();

evaluationsRoutes.post('/', ensureAuthentication, createEvaluationsController.handle);
evaluationsRoutes.get('/find', ensureAuthentication, findEvaluationsController.handle);
evaluationsRoutes.put('/', ensureAuthentication, updateEvaluationsController.handle);

export { evaluationsRoutes };
