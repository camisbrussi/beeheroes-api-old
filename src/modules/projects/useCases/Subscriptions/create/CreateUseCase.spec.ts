import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { OrganizationsRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationRepositoryInMemory';
import { ProjectsRepositoryInMemory } from '@modules/projects/repositories/in-memory/ProjectRepositoryInMemory';
import { SubscriptionsRepositoryInMemory } from '@modules/projects/repositories/in-memory/SubscriptionRepositoryInMemory';
import { VolunteersRepositoryInMemory } from '@modules/volunteers/repositories/in-memory/VolunteersRepositoryInMemory';
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
    volunteersRepositoryInMemory,
  );
});

describe('Create Subscription ', () => {
  it('should be able to create a new subscription ', async () => {
    const organization = await organizationsRepositoryInMemory.create({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 'id',
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
      user_type_id: 1,
    });

    const volunteer = await volunteersRepositoryInMemory.create({
      cpf: '0000',
      profession: 'profession',
      description: 'xxxx',
      occupation_area_id: 'occupationArea',
      user_id: user.id,
    });

    const subscription = await createSubscriptionUseCase.execute({
      registration_date: new Date(),
      project_id: project.id,
      volunteer_id: volunteer.id,
    });

    expect(subscription).toHaveProperty('id');
    expect(subscription.status).toEqual(Number(process.env.SUBSCRIPTION_STATUS_ACTIVE));
  });

  it('should not be able to create a new subscription case project does not exists', async () => {
    const user = await await usersRepositoryInMemory.create({
      name: 'Name test',
      email: 'teste@beeheroes.com',
      password: '123456',
      user_type_id: 1,
    });

    const volunteer = await volunteersRepositoryInMemory.create({
      cpf: '0000',
      profession: 'profession',
      description: 'xxxx',
      occupation_area_id: 'occupationArea',
      user_id: user.id,
    });
    await expect(
      createSubscriptionUseCase.execute({
        registration_date: new Date(),
        project_id: 'project.id',
        volunteer_id: volunteer.id,
      }),
    ).rejects.toEqual(new AppError('Project does not exists!'));
  });

  it('should not be able to create a new subscription case project does not exists', async () => {
    const organization = await organizationsRepositoryInMemory.create({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 'id',
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
        registration_date: new Date(),
        project_id: project.id,
        volunteer_id: 'volunteer.id',
      }),
    ).rejects.toEqual(new AppError('Volunteer does not exists!'));
  });

  it('should not be able to create a subscription already exists', async () => {
    const organization = await organizationsRepositoryInMemory.create({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 'id',
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
      user_type_id: 1,
    });

    const volunteer = await volunteersRepositoryInMemory.create({
      cpf: '0000',
      profession: 'profession',
      description: 'xxxx',
      occupation_area_id: 'occupationArea',
      user_id: user.id,
    });

    await createSubscriptionUseCase.execute({
      registration_date: new Date(),
      project_id: project.id,
      volunteer_id: volunteer.id,
    });

    await expect(
      createSubscriptionUseCase.execute({
        registration_date: new Date(),
        project_id: project.id,
        volunteer_id: volunteer.id,
      }),
    ).rejects.toEqual(new AppError('Subscription already exists!'));
  });
});
