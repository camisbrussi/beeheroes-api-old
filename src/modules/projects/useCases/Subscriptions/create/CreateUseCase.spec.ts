import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { VolunteersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/VolunteersRepositoryInMemory';
import { OrganizationsRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationRepositoryInMemory';
import { ProjectsRepositoryInMemory } from '@modules/projects/repositories/in-memory/ProjectRepositoryInMemory';
import { SubscriptionsRepositoryInMemory } from '@modules/projects/repositories/in-memory/SubscriptionRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateSubscriptionUseCase } from './CreateUseCase';

let createSubscriptionUseCase: CreateSubscriptionUseCase;
let subscriptionsRepositoryInMemory: SubscriptionsRepositoryInMemory;
let projectsRepositoryInMemory: ProjectsRepositoryInMemory;
let volunteersRepositoryInMemory: VolunteersRepositoryInMemory;
let organizationsRepositoryInMemory: OrganizationsRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;

beforeEach(() => {
  subscriptionsRepositoryInMemory = new SubscriptionsRepositoryInMemory();
  projectsRepositoryInMemory = new ProjectsRepositoryInMemory();
  volunteersRepositoryInMemory = new VolunteersRepositoryInMemory();
  usersRepositoryInMemory = new UsersRepositoryInMemory();
  organizationsRepositoryInMemory = new OrganizationsRepositoryInMemory();
  createSubscriptionUseCase = new CreateSubscriptionUseCase(
    subscriptionsRepositoryInMemory,
    projectsRepositoryInMemory,
    usersRepositoryInMemory,
  );
});

describe('Create Subscription ', () => {
  it('should be able to create a new subscription ', async () => {
    const organization = await organizationsRepositoryInMemory.create({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 1,
    });

    const project = await projectsRepositoryInMemory.create({
      name: 'Test Project',
      description: 'Test Project',
      start: new Date(),
      end: new Date(),
      vacancies: 2,
      organization_id: organization.id,
    });

    const user = await await usersRepositoryInMemory.create({
      name: 'Name test',
      email: 'teste@beeheroes.com',
      password: '123456',
    });

    const subscription = await createSubscriptionUseCase.execute({
      project_id: project.id,
      user_id: user.id,
    });

    expect(subscription).toHaveProperty('id');
    expect(subscription.status).toEqual(Number(process.env.SUBSCRIPTION_STATUS_ACTIVE));
  });

  it('should not be able to create a new subscription case project does not exists', async () => {
    const user = await await usersRepositoryInMemory.create({
      name: 'Name test',
      email: 'teste@beeheroes.com',
      password: '123456',
    });

    await expect(
      createSubscriptionUseCase.execute({
        project_id: 'project.id',
        user_id: user.id,
      }),
    ).rejects.toEqual(new AppError('Project does not exists!'));
  });

  it('should not be able to create a new subscription case project does not exists', async () => {
    const organization = await organizationsRepositoryInMemory.create({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 5,
    });

    const project = await projectsRepositoryInMemory.create({
      name: 'Test Project',
      description: 'Test Project',
      start: new Date(),
      end: new Date(),
      vacancies: 2,
      organization_id: organization.id,
    });
    await expect(
      createSubscriptionUseCase.execute({
        project_id: project.id,
        user_id: 'user.id',
      }),
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should not be able to create a subscription already exists', async () => {
    const organization = await organizationsRepositoryInMemory.create({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 6,
    });

    const project = await projectsRepositoryInMemory.create({
      name: 'Test Project',
      description: 'Test Project',
      start: new Date(),
      end: new Date(),
      vacancies: 2,
      organization_id: organization.id,
    });

    const user = await await usersRepositoryInMemory.create({
      name: 'Name test',
      email: 'teste@beeheroes.com',
      password: '123456',
    });

    await createSubscriptionUseCase.execute({
      project_id: project.id,
      user_id: user.id,
    });

    await expect(
      createSubscriptionUseCase.execute({
        project_id: project.id,
        user_id: user.id,
      }),
    ).rejects.toEqual(new AppError('Subscription already exists!'));
  });
});
