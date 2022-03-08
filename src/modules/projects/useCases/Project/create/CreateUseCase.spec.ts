import { OrganizationsRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationRepositoryInMemory';
import { ProjectsRepositoryInMemory } from '@modules/projects/repositories/in-memory/ProjectRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateProjectUseCase } from './CreateUseCase';

let createProjectUseCase: CreateProjectUseCase;
let projectsRepositoryInMemory: ProjectsRepositoryInMemory;
let organizationsRepositoryInMemory: OrganizationsRepositoryInMemory;

beforeEach(() => {
  projectsRepositoryInMemory = new ProjectsRepositoryInMemory();
  organizationsRepositoryInMemory = new OrganizationsRepositoryInMemory();
  createProjectUseCase = new CreateProjectUseCase(
    projectsRepositoryInMemory,
    organizationsRepositoryInMemory,
  );
});

describe('Create Project ', () => {
  it('should be able to create a new project ', async () => {
    const organization = await organizationsRepositoryInMemory.create({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 'id',
    });

    const project = {
      name: 'Project Name',
      description: ' Projeto de teste',
      start: new Date(),
      end: new Date(),
      vacancies: 2,
      organization_id: organization.id,
    };

    const createProject = await createProjectUseCase.execute(project);

    expect(createProject.name).toEqual(project.name);
  });

  it('should be able to create a project with status active by default', async () => {
    const organization = await organizationsRepositoryInMemory.create({
      name: 'Organization Name',
      email: 'organization1@beeheroes.com',
      cnpj: '000000000001',
      description: 'Description Organization',
      organization_type_id: 'id',
    });

    const project = await createProjectUseCase.execute({
      name: 'Project Name',
      description: 'Test Project',
      start: new Date(),
      end: new Date(),
      vacancies: 2,
      organization_id: organization.id,
    });

    expect(project.status).toEqual(Number(process.env.PROJECT_STATUS_ACTIVE));
  });

  it('should not be able to create a new project case organization does not exists', async () => {
    await expect(
      createProjectUseCase.execute({
        name: 'Project Name',
        description: 'Test Project',
        start: new Date(),
        end: new Date(),
        vacancies: 2,
        organization_id: 'idteste',
      }),
    ).rejects.toEqual(new AppError('Organization does not exists!'));
  });
});
