


import { OrganizationsRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateOrganizationUseCase } from '../create/CreateUseCase';
import { UpdateOrganizationUseCase } from './UpdateUseCase';

let createOrganizationUseCase: CreateOrganizationUseCase;
let updateUseCase: UpdateOrganizationUseCase;
let organizationsRepositoryInMemory: OrganizationsRepositoryInMemory;

describe('Update Type Organization', () => {
  beforeEach(() => {
    organizationsRepositoryInMemory = new OrganizationsRepositoryInMemory();
    createOrganizationUseCase = new CreateOrganizationUseCase(organizationsRepositoryInMemory);
    updateUseCase = new UpdateOrganizationUseCase(organizationsRepositoryInMemory);
  });

  it("should be able to edit a organization", async () => {
    const organization = await createOrganizationUseCase.execute({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 'id',
    });

    const organizationEdit = {
      id: organization.id,
      name: 'Organization Name',
      email: 'organization1@beeheroes.com',
    }

    await updateUseCase.execute(organizationEdit);

    const organizationEdited = await organizationsRepositoryInMemory.findByEmail(organizationEdit.email);

    expect(organizationEdited.name).toEqual(organizationEdit.name);
    expect(organizationEdited.email).toEqual(organizationEdit.email);
  });

  it("should be able to edit a organization name", async () => {
    const organization = await createOrganizationUseCase.execute({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 'id',
    });

    const organizationEdit = {
      id: organization.id,
      name: "Organization name edit",
    }

    await updateUseCase.execute(organizationEdit);

    const organizationEdited = await organizationsRepositoryInMemory.findByEmail(organization.email);

    expect(organizationEdited.name).toEqual(organizationEdit.name);
    expect(organizationEdited.email).toEqual(organization.email);
  });

  it("should not be able to edit a organization with exists email", async () => {

    await expect(async() => {
      await createOrganizationUseCase.execute({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 'id',
    });

    const organization = await createOrganizationUseCase.execute({
      name: 'Organization Name',
      email: 'organization2@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 'id',
    });

    const organizationEdit = {
      id: organization.id,
      email: 'organization@beeheroes.com',
    }
     await updateUseCase.execute(organizationEdit);

    }).rejects.toEqual(new AppError('Organization already exists!'));
  });
})