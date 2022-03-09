import { AddressesRepositoryInMemory } from '@modules/addresses/repositories/in-memory/AddressRepositoryInMemory';
import { PhonesRepositoryInMemory } from '@modules/addresses/repositories/in-memory/PhonesRepositoryInMemory';
import { OrganizationsRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationRepositoryInMemory';
import { OrganizationTypeRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationTypesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateOrganizationUseCase } from '../create/CreateUseCase';
import { UpdateOrganizationUseCase } from './UpdateUseCase';

let createOrganizationUseCase: CreateOrganizationUseCase;
let updateUseCase: UpdateOrganizationUseCase;
let organizationsRepositoryInMemory: OrganizationsRepositoryInMemory;
let addressesRepositoryInMemory: AddressesRepositoryInMemory;
let phonesRepositoryInMemory: PhonesRepositoryInMemory;
let organizationTypesRepositoryInMemory: OrganizationTypeRepositoryInMemory;

describe('Update Type Organization', () => {
  beforeEach(() => {
    organizationsRepositoryInMemory = new OrganizationsRepositoryInMemory();
    addressesRepositoryInMemory = new AddressesRepositoryInMemory();
    phonesRepositoryInMemory = new PhonesRepositoryInMemory();
    organizationTypesRepositoryInMemory = new OrganizationTypeRepositoryInMemory();
    createOrganizationUseCase = new CreateOrganizationUseCase(
      organizationsRepositoryInMemory,
      addressesRepositoryInMemory,
      phonesRepositoryInMemory,
      organizationTypesRepositoryInMemory,
    );
    updateUseCase = new UpdateOrganizationUseCase(
      organizationsRepositoryInMemory,
      addressesRepositoryInMemory,
      phonesRepositoryInMemory,
    );
  });

  it('should be able to edit a organization', async () => {
    const organizationType = await organizationTypesRepositoryInMemory.create({
      name: 'Organization Type',
    });
    const organization = await createOrganizationUseCase.execute({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: organizationType.id,

    });

    const organizationEdit = {
      id: organization.id,
      name: 'Organization Name',
      email: 'organization1@beeheroes.com',
    };

    await updateUseCase.execute(organizationEdit);

    const organizationEdited = await organizationsRepositoryInMemory
      .findByEmail(organizationEdit.email);

    expect(organizationEdited.name).toEqual(organizationEdit.name);
    expect(organizationEdited.email).toEqual(organizationEdit.email);
  });

  it('should be able to edit a organization name', async () => {
    const organizationType = await organizationTypesRepositoryInMemory.create({
      name: 'Organization Type',
    });
    const organization = await createOrganizationUseCase.execute({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: organizationType.id,

    });

    const organizationEdit = {
      id: organization.id,
      name: 'Organization name edit',
    };

    await updateUseCase.execute(organizationEdit);

    const organizationEdited = await organizationsRepositoryInMemory
      .findByEmail(organization.email);

    expect(organizationEdited.name).toEqual(organizationEdit.name);
    expect(organizationEdited.email).toEqual(organization.email);
  });

  it('should not be able to edit a organization with exists email', async () => {
    const organizationType = await organizationTypesRepositoryInMemory.create({
      name: 'Organization Type',
    });
    await expect(async () => {
      await createOrganizationUseCase.execute({
        name: 'Organization Name',
        email: 'organization@beeheroes.com',
        cnpj: '000000000000',
        description: 'Description Organization',
        organization_type_id: organizationType.id,

      });

      const organization = await createOrganizationUseCase.execute({
        name: 'Organization Name',
        email: 'organization2@beeheroes.com',
        cnpj: '000000000000',
        description: 'Description Organization',
        organization_type_id: organizationType.id,

      });

      const organizationEdit = {
        id: organization.id,
        email: 'organization@beeheroes.com',
      };
      await updateUseCase.execute(organizationEdit);
    }).rejects.toEqual(new AppError('Organization already exists!'));
  });

  it('should be able to edit a organization and add address', async () => {
    const organizationType = await organizationTypesRepositoryInMemory.create({
      name: 'Organization Type',
    });
    const organization = await createOrganizationUseCase.execute({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: organizationType.id,

    });

    const organizationEdit = {
      id: organization.id,
      address: {
        street: 'Street Example edited',
        number: '123',
        complement: '123',
        district: 'District',
        cep: 12345,
        city_id: 1,
      },
    };

    const organizationData = await updateUseCase.execute(organizationEdit);

    const organizationAddress = await addressesRepositoryInMemory
      .findById(organizationData.address_id);

    expect(organizationAddress.street).toEqual('Street Example edited');
  });

  it('should be able to edit a organization and edit address', async () => {
    const organizationType = await organizationTypesRepositoryInMemory.create({
      name: 'Organization Type',
    });
    const organization = await createOrganizationUseCase.execute({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: organizationType.id,

      address: {
        street: 'Street Example',
        number: '123',
        complement: '123',
        district: 'District',
        cep: 12345,
        city_id: 1,
      },
    });

    const organizationEdit = {
      id: organization.id,
      id_address: organization.address_id,
      address: {
        street: 'Street Example edited',
        number: '123',
        complement: '123',
        district: 'District',
        cep: 12345,
        city_id: 1,
      },
    };

    const organizationData = await updateUseCase.execute(organizationEdit);

    const organizationAddress = await addressesRepositoryInMemory
      .findById(organizationData.address_id);

    expect(organizationAddress.street).toEqual('Street Example edited');
  });

  it('should be able to edit a organization and add phones', async () => {
    const organizationType = await organizationTypesRepositoryInMemory.create({
      name: 'Organization Type',
    });
    const organization = await createOrganizationUseCase.execute({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: organizationType.id,

    });

    const organizationEdit = {
      id: organization.id,
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
    };

    const organizationData = await updateUseCase.execute(organizationEdit);

    const organizationPhones = await phonesRepositoryInMemory
      .findByOrganizationId(organizationData.id);

    expect(organizationPhones.length).toBe(2);
  });

  it('should be able to edit a organization and edit address', async () => {
    const organizationType = await organizationTypesRepositoryInMemory.create({
      name: 'Organization Type',
    });
    const organization = await createOrganizationUseCase.execute({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: organizationType.id,

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

    const organizationEdit = {
      id: organization.id,
      phones: [
        {
          number: '789',
          is_whatsapp: true,
        },
      ],
    };

    const organizationData = await updateUseCase.execute(organizationEdit);

    const organizationPhones = await phonesRepositoryInMemory
      .findByOrganizationId(organizationData.id);

    expect(organizationPhones.length).toBe(1);
    expect(organizationPhones[0].number).toBe('789');
  });
});
