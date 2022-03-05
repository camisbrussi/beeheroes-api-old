import { ProjectsRepositoryInMemory } from '@modules/projects/repositories/in-memory/ProjectRepositoryInMemory';

import { ListProjectsUseCase } from './ListUseCase';

let listProjectsUseCase: ListProjectsUseCase;
let projectsRepositoryInMemory: ProjectsRepositoryInMemory;

describe('List Project', () => {
  beforeEach(() => {
    projectsRepositoryInMemory = new ProjectsRepositoryInMemory();
    listProjectsUseCase = new ListProjectsUseCase(projectsRepositoryInMemory);
  });

  it('should be abe to list all project', async () => {
    const newProject = await projectsRepositoryInMemory.create({
      name: 'Project Name',
      description: 'Test Project',
      start: new Date(),
      end: new Date(),
      vacancies: 2,
      organization_id: 'id',
    });

    const project = await listProjectsUseCase.execute();

    expect(project).toEqual([newProject]);
  });
});
