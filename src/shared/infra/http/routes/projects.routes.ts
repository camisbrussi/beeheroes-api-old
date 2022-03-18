import { Router } from 'express';

import { CreateProjectController } from '@modules/projects/useCases/Project/create/CreateController';
import { FilterProjectController } from '@modules/projects/useCases/Project/filter/FilterController';
import { FindProjectController } from '@modules/projects/useCases/Project/find/FindController';
import { UpdateProjectController } from '@modules/projects/useCases/Project/update/UpdateController';

import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const projectsRoutes = Router();

const createProjectsController = new CreateProjectController();
const findProjectsController = new FindProjectController();
const updateProjectsController = new UpdateProjectController();
const filterProjectsController = new FilterProjectController();

projectsRoutes.post('/', ensureAuthentication, createProjectsController.handle);
projectsRoutes.get('/find', ensureAuthentication, findProjectsController.handle);
projectsRoutes.get('/', ensureAuthentication, filterProjectsController.handle);
projectsRoutes.put('/', ensureAuthentication, updateProjectsController.handle);

export { projectsRoutes };
