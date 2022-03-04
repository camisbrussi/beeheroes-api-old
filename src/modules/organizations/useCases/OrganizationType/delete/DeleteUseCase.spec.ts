import { OrganizationsRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationRepositoryInMemory';
import { OrganizationTypeRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationTypesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateOrganizationTypeUseCase } from '../create/CreateUseCase';
import { FindOrganizationTypeUseCase } from '../find/FindUseCase';
import { DeleteOrganizationTypeUseCase } from './DeleteUseCase';

let createOrganizationTypeUseCase: CreateOrganizationTypeUseCase;
let deleteTypeUseCase: DeleteOrganizationTypeUseCase;
let findOrganizationTypeUseCase: FindOrganizationTypeUseCase;
let organizationTypesRepositoryInMemory: OrganizationTypeRepositoryInMemory;
let organizationsRepositoryInMemory: OrganizationsRepositoryInMemory;

describe('Update Type organization', () => {
  beforeEach(() => {
    organizationTypesRepositoryInMemory = new OrganizationTypeRepositoryInMemory();
    organizationsRepositoryInMemory = new OrganizationsRepositoryInMemory();
    createOrganizationTypeUseCase = new CreateOrganizationTypeUseCase(
      organizationTypesRepositoryInMemory,
    );
    deleteTypeUseCase = new DeleteOrganizationTypeUseCase(
      organizationsRepositoryInMemory,
      organizationTypesRepositoryInMemory,
    );
    findOrganizationTypeUseCase = new FindOrganizationTypeUseCase(
      organizationTypesRepositoryInMemory,
    );
  });

  it('should be able to delete a organization type', async () => {
    const organizationType = await createOrganizationTypeUseCase.execute({
      name: 'Organization Type name',
      description: 'Organization type description',
    });

    await deleteTypeUseCase.execute(organizationType.id);
    const typeOrganization = await findOrganizationTypeUseCase.execute(organizationType.id);

    expect(typeOrganization).toBeUndefined();
  });

  it('should not be able to delete a organization type in use', async () => {
    const organizationType = await createOrganizationTypeUseCase.execute({
      name: 'Organization Type name',
      description: 'Organization type description',
    });

    await organizationsRepositoryInMemory.create({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: organizationType.id,
    });

    await expect(
      deleteTypeUseCase.execute(organizationType.id),
    ).rejects.toEqual(new AppError("Organization type is in use and can't deleted!"));
  });
});
