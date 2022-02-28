import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { OrganizationsRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateOrganizationUserUseCase } from './CreateUseCase';

let createOrganizationUserUseCase: CreateOrganizationUserUseCase;
let organizationRepositoryInMemory: OrganizationsRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Create Organization User', () => {
  beforeEach(() => {
    organizationRepositoryInMemory = new OrganizationsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createOrganizationUserUseCase = new CreateOrganizationUserUseCase(
      organizationRepositoryInMemory,
      usersRepositoryInMemory,
    );
  });

  it('should not be able to add a new user to a not existent organization', async () => {
    const organization_id = '123';
    const users_id = ['321'];

    await expect(
      createOrganizationUserUseCase.execute({ organization_id, users_id }),
    ).rejects.toEqual(new AppError('Organization does not exist'));
  });

  it('should be able to add a new user to the organization', async () => {
    const organization = await organizationRepositoryInMemory.create({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 'id',
    });

    const user = await usersRepositoryInMemory.create({
      name: 'Admin',
      email: 'supertest@beeheroes.com',
      password: '123456',
      user_type_id: 'id',
    });

    const users_id = [user.id];

    const organizationsUsers = await createOrganizationUserUseCase.execute({
      organization_id: organization.id,
      users_id,
    });

    expect(organizationsUsers).toHaveProperty('users');
    expect(organizationsUsers.users.length).toBe(1);
  });
});
