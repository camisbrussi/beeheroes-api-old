import { OrganizationTypeRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationTypesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateOrganizationTypeUseCase } from '../create/CreateUseCase';
import { UpdateOrganizationTypeUseCase } from './UpdateUseCase';

let createOrganizationTypeUseCase: CreateOrganizationTypeUseCase;
let updateTypeUseCase: UpdateOrganizationTypeUseCase;
let organizationTypesRepositoryInMemory: OrganizationTypeRepositoryInMemory;

describe('Update Type Organization', () => {
  beforeEach(() => {
    organizationTypesRepositoryInMemory = new OrganizationTypeRepositoryInMemory();
    createOrganizationTypeUseCase = new CreateOrganizationTypeUseCase(
      organizationTypesRepositoryInMemory,
    );
    updateTypeUseCase = new UpdateOrganizationTypeUseCase(organizationTypesRepositoryInMemory);
  });

  it('should be able to edit a organization type', async () => {
    const organizationType = await createOrganizationTypeUseCase.execute({
      name: 'Organization Type name',
    });

    const organizationTypeEdit = {
      id: organizationType.id,
      name: 'Organization Type name editado',
    };

    await updateTypeUseCase.execute(organizationTypeEdit);

    const organizationTypeEdited = await organizationTypesRepositoryInMemory
      .findByName(organizationTypeEdit.name);

    expect(organizationTypeEdited.name).toEqual(organizationTypeEdit.name);
  });

  it('should be able to edit a organization type name', async () => {
    const organizationType = await createOrganizationTypeUseCase.execute({
      name: 'Organization Type name',
    });

    const organizationTypeEdit = {
      id: organizationType.id,
      name: 'Organization Type name editado',
    };

    await updateTypeUseCase.execute(organizationTypeEdit);

    const organizationTypeEdited = await organizationTypesRepositoryInMemory
      .findByName(organizationTypeEdit.name);

    expect(organizationTypeEdited.name).toEqual(organizationTypeEdit.name);
  });

  it('should be able to edit a organization type description', async () => {
    const organizationType = await createOrganizationTypeUseCase.execute({
      name: 'Organization Type name',
    });

    const organizationTypeEdit = {
      id: organizationType.id,
    };

    await updateTypeUseCase.execute(organizationTypeEdit);

    const organizationTypeEdited = await organizationTypesRepositoryInMemory
      .findByName(organizationType.name);

    expect(organizationTypeEdited.name).toEqual(organizationType.name);
  });

  it('should not be able to edit a organization type with exists name', async () => {
    await expect(async () => {
      const organizationType = await createOrganizationTypeUseCase.execute({
        name: 'Organization Type name',
      });

      await createOrganizationTypeUseCase.execute({
        name: 'Organization Type name2',
      });

      const organizationTypeEdit = {
        id: organizationType.id,
        name: 'Organization Type name',
      };
      await updateTypeUseCase.execute(organizationTypeEdit);
    }).rejects.toEqual(new AppError('Organization type already exists!'));
  });
});
