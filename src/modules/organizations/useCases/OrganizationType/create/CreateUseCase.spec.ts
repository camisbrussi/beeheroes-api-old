import { OrganizationTypeRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationTypesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateOrganizationTypeUseCase } from './CreateUseCase';

let createOrganizationTypeUseCase: CreateOrganizationTypeUseCase;
let organizationTypesRepositoryInMemory: OrganizationTypeRepositoryInMemory;

describe('Create Organization Type', () => {
  beforeEach(() => {
    organizationTypesRepositoryInMemory = new OrganizationTypeRepositoryInMemory();
    createOrganizationTypeUseCase = new CreateOrganizationTypeUseCase(
      organizationTypesRepositoryInMemory,
    );
  });
  it('should be able to create a new organization type', async () => {
    const organizationType = {
      id: 1,
      name: 'Organization Type name',
    };

    await createOrganizationTypeUseCase.execute(organizationType);

    const organizationTypeCreated = await organizationTypesRepositoryInMemory
      .findByName(organizationType.name);

    expect(organizationTypeCreated).toHaveProperty('id');
  });

  it('should not be able to create a organization type if exists name', async () => {
    await expect(async () => {
      await createOrganizationTypeUseCase.execute({
        id: 2,
        name: 'Organization Type',
      });

      await createOrganizationTypeUseCase.execute({
        id: 3,
        name: 'Organization Type',
      });
    }).rejects.toEqual(new AppError('Organization type already exists!'));
  });
});
