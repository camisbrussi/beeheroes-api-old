import { AddressesRepositoryInMemory } from '@modules/addresses/repositories/in-memory/AddressRepositoryInMemory';
import { PhonesRepositoryInMemory } from '@modules/addresses/repositories/in-memory/PhonesRepositoryInMemory';
import { OrganizationsRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateOrganizationUseCase } from './CreateUseCase';

let createOrganizationUseCase: CreateOrganizationUseCase;
let organizationsRepositoryInMemory: OrganizationsRepositoryInMemory;
let addressesRepositoryInMemory: AddressesRepositoryInMemory;
let phonesRepositoryInMemory: PhonesRepositoryInMemory;

beforeEach(() => {
  organizationsRepositoryInMemory = new OrganizationsRepositoryInMemory();
  addressesRepositoryInMemory = new AddressesRepositoryInMemory();
  phonesRepositoryInMemory = new PhonesRepositoryInMemory();
  createOrganizationUseCase = new CreateOrganizationUseCase(organizationsRepositoryInMemory,
    addressesRepositoryInMemory,
    phonesRepositoryInMemory);
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

  it('should be able to create a organization with status await by default', async () => {
    const organization = await createOrganizationUseCase.execute({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 'id',
    });

    expect(organization.status).toBe(Number(process.env.ORGANIZATION_STATUS_AWAIT));
  });

  it('should be able to create a new organization with address', async () => {
    const organization = await await createOrganizationUseCase.execute({
      name: 'Organization Name',
      email: 'organization1@beeheroes.com',
      cnpj: '000000000001',
      description: 'Description Organization',
      organization_type_id: 'id',
      address: {
        street: 'Street Example - Edited',
        number: '123',
        complement: '123',
        district: 'District',
        cep: 12345,
        city_id: 1,
      },
    });

    const address = await addressesRepositoryInMemory.findById(organization.address_id);

    expect(organization.address).not.toBeNull();
    expect(address.street).toEqual('Street Example - Edited');
  });

  it('should be able to create a new organization with phones', async () => {
    const organization = await await createOrganizationUseCase.execute({
      name: 'Organization Name',
      email: 'organization1@beeheroes.com',
      cnpj: '000000000001',
      description: 'Description Organization',
      organization_type_id: 'id',
      phones: [
        {
          number: '123',
          is_whatsapp: true,
        },
        {
          number: '321',
          is_whatsapp: true,
        },
      ],
    });

    const phones = await phonesRepositoryInMemory.findByOrganizationId(organization.id);

    expect(phones.length).toBe(2);
  });
});
