import { Router } from 'express';

import { CreateProjectController } from '@modules/projects/useCases/Project/create/CreateController';
import { FilterProjectController } from '@modules/projects/useCases/Project/filter/FilterController';
import { FindProjectController } from '@modules/projects/useCases/Project/find/FindController';
import { ListProjectController } from '@modules/projects/useCases/Project/list/ListController';
import { UpdateProjectController } from '@modules/projects/useCases/Project/update/UpdateController';

import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const projectsRoutes = Router();

const createProjectsController = new CreateProjectController();
const findProjectsController = new FindProjectController();
const updateProjectsController = new UpdateProjectController();
const listProjectsController = new ListProjectController();
const filterProjectsController = new FilterProjectController();

projectsRoutes.post('/', ensureAuthentication, createProjectsController.handle);
projectsRoutes.get('/find', ensureAuthentication, findProjectsController.handle);
projectsRoutes.get('/filter', ensureAuthentication, filterProjectsController.handle);
projectsRoutes.get('/', ensureAuthentication, listProjectsController.handle);
projectsRoutes.put('/', ensureAuthentication, updateProjectsController.handle);

export { projectsRoutes };
