import { AddressRepositoryInMemory } from '@modules/address/repositories/in-memory/AddressRepositoryInMemory';
import { OrganizationsRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateOrganizationUseCase } from './CreateUseCase';

let createOrganizationUseCase: CreateOrganizationUseCase;
let organizationsRepositoryInMemory: OrganizationsRepositoryInMemory;
let addressRepositoryInMemory: AddressRepositoryInMemory;

beforeEach(() => {
  organizationsRepositoryInMemory = new OrganizationsRepositoryInMemory();
  addressRepositoryInMemory = new AddressRepositoryInMemory();
  createOrganizationUseCase = new CreateOrganizationUseCase(organizationsRepositoryInMemory,
    addressRepositoryInMemory);
});

describe('Create Organization ', () => {
  it('should be able to create a new organization ', async () => {
    const organization = {
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 'id',
    };

    await createOrganizationUseCase.execute(organization);

    const organizationCreated = await organizationsRepositoryInMemory
      .findByEmail(organization.email);

    expect(organizationCreated).toHaveProperty('id');
  });

  it('should not be able to create a new  with email exists', async () => {
    await createOrganizationUseCase.execute({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 'id',
    });

    await expect(
      createOrganizationUseCase.execute({
        name: 'Organization Name',
        email: 'organization@beeheroes.com',
        cnpj: '111111111',
        description: 'Description Organization',
        organization_type_id: 'id',
      }),
    ).rejects.toEqual(new AppError('Organization already exists!'));
  });

  it('should not be able to create a new  with cnpj exists', async () => {
    await createOrganizationUseCase.execute({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 'id',
    });

    await expect(
      createOrganizationUseCase.execute({
        name: 'Organization Name',
        email: 'organization1@beeheroes.com',
        cnpj: '000000000000',
        description: 'Description Organization',
        organization_type_id: 'id',
      }),
    ).rejects.toEqual(new AppError('Organization already exists!'));
  });

  it('should not be able to create a organization with status await by default', async () => {
    const organization = await createOrganizationUseCase.execute({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 'id',
    });

    expect(organization.status).toBe(Number(process.env.ORGANIZATION_STATUS_AWAIT));
  });
});