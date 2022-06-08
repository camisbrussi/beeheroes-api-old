import { ProjectsRepositoryInMemory } from '@modules/projects/repositories/in-memory/ProjectRepositoryInMemory';

import { FindProjectUseCase } from './FindUseCase';

let findProjectUseCase: FindProjectUseCase;
let projectsRepositoryInMemory: ProjectsRepositoryInMemory;

describe('List Project', () => {
  beforeEach(() => {
    projectsRepositoryInMemory = new ProjectsRepositoryInMemory();
    findProjectUseCase = new FindProjectUseCase(projectsRepositoryInMemory);
  });

  it('should be abe to find project', async () => {
    const newProject = {
      name: 'Project Name',
      description: 'Test Project',
      start: new Date(),
      end: new Date(),
      vacancies: 2,
      organization_id: 'id',
    };

    const { id } = await projectsRepositoryInMemory.create(newProject);

    const project = await findProjectUseCase.execute(id);

    expect(project).toHaveProperty('id');
  });
});
