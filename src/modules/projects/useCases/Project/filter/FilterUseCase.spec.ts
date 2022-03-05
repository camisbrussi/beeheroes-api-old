import { IProjectDTO } from '@modules/projects/dtos/IProjectDTO';
import { ProjectsRepositoryInMemory } from '@modules/projects/repositories/in-memory/ProjectRepositoryInMemory';

import { FilterProjectUseCase } from './FilterUseCase';

let filterProjectUseCase: FilterProjectUseCase;
let projectsRepositoryInMemory: ProjectsRepositoryInMemory;

describe('List Project', () => {
  beforeEach(() => {
    projectsRepositoryInMemory = new ProjectsRepositoryInMemory();
    filterProjectUseCase = new FilterProjectUseCase(projectsRepositoryInMemory);
  });

  it('should be abe to filter project for name', async () => {
    const newProject1: IProjectDTO = {
      name: 'Project Name',
      description: 'Test Project',
      start: new Date(),
      end: new Date(),
      vacancies: 2,
      organization_id: 'id',
    };

    const newProject2: IProjectDTO = {
      name: 'Project Name',
      description: 'Test Project',
      start: new Date(),
      end: new Date(),
      vacancies: 2,
      organization_id: 'id',
    };

    await projectsRepositoryInMemory.create(newProject1);
    await projectsRepositoryInMemory.create(newProject2);

    const project = await filterProjectUseCase.execute({ name: 'Project' });

    expect(project.length).toBe(2);
  });

  it('should be abe to filter project for name and organization', async () => {
    const newProject1: IProjectDTO = {
      name: 'Project Name',
      description: 'Test Project',
      start: new Date(),
      end: new Date(),
      vacancies: 2,
      organization_id: 'id',
    };

    const newProject2: IProjectDTO = {
      name: 'Project Name',
      description: 'Test Project',
      start: new Date(),
      end: new Date(),
      vacancies: 2,
      organization_id: 'id',
    };

    await projectsRepositoryInMemory.create(newProject1);
    await projectsRepositoryInMemory.create(newProject2);

    const project = await filterProjectUseCase
      .execute({ name: 'Project', organization_id: 'id' });

    expect(project.length).toBe(2);
  });
});
