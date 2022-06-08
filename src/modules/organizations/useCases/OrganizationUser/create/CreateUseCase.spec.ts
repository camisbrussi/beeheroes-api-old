import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/User/create/CreateUseCase';
import { AddressesRepositoryInMemory } from '@modules/addresses/repositories/in-memory/AddressRepositoryInMemory';
import { PhonesRepositoryInMemory } from '@modules/addresses/repositories/in-memory/PhonesRepositoryInMemory';
import { OrganizationsRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationRepositoryInMemory';
import { OrganizationTypeRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationTypesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateOrganizationUseCase } from '../../Organization/create/CreateUseCase';
import { CreateOrganizationTypeUseCase } from '../../OrganizationType/create/CreateUseCase';
import { CreateOrganizationUserUseCase } from './CreateUseCase';

let createOrganizationUseCase: CreateOrganizationUseCase;
let createOrganizationUserUseCase : CreateOrganizationUserUseCase;
let createUserUseCase : CreateUserUseCase;
let createOrganizationTypeUseCase : CreateOrganizationTypeUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let organizationRepositoryInMemory: OrganizationsRepositoryInMemory;
let addressesRepositoryInMemory: AddressesRepositoryInMemory;
let organizationTypeRepositoryInMemory: OrganizationTypeRepositoryInMemory;
let phonesRepositoryInMemory: PhonesRepositoryInMemory;

describe('Create Organization Users', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    organizationRepositoryInMemory = new OrganizationsRepositoryInMemory();
    addressesRepositoryInMemory = new AddressesRepositoryInMemory();
    organizationTypeRepositoryInMemory = new OrganizationTypeRepositoryInMemory();
    phonesRepositoryInMemory = new PhonesRepositoryInMemory();
    createOrganizationUseCase = new CreateOrganizationUseCase(
      organizationRepositoryInMemory,
      addressesRepositoryInMemory,
      organizationTypeRepositoryInMemory,
      phonesRepositoryInMemory,
    );
    createOrganizationUserUseCase = new CreateOrganizationUserUseCase(
      organizationRepositoryInMemory,
      userRepositoryInMemory,
    );
    createUserUseCase = new CreateUserUseCase(
      userRepositoryInMemory,
      addressesRepositoryInMemory,
    );
    createOrganizationTypeUseCase = new CreateOrganizationTypeUseCase(
      organizationTypeRepositoryInMemory,
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
    const organizatgionType = await createOrganizationTypeUseCase.execute({
      name: 'admin',
    });
    const user = await createUserUseCase.execute({
      name: 'Admin',
      email: 'supertest@beeheroes.com',
      password: '123456',
      is_volunteer: false,
    });

    const organization = await createOrganizationUseCase.execute({
      name: 'Admin',
      cnpj: '123456',
      description: 'xxxxx',
      email: 'admin@teste.com',
      organization_type_id: organizatgionType.id,
    });

    const users_id = [user.id];

    const organizationUsers = await createOrganizationUserUseCase.execute({
      users_id,
      organization_id: organization.id,
    });

    expect(organizationUsers).toHaveProperty('id');
  });
});
