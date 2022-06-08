import { OrganizationTypeRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationTypesRepositoryInMemory';

import { ListOrganizationTypesUseCase } from './LisUseCase';

let listOrganizationsTypeUseCase: ListOrganizationTypesUseCase;
let organizationTypesRepositoryInMemory: OrganizationTypeRepositoryInMemory;

describe('List Organizations Type', () => {
  beforeEach(() => {
    organizationTypesRepositoryInMemory = new OrganizationTypeRepositoryInMemory();
    listOrganizationsTypeUseCase = new ListOrganizationTypesUseCase(
      organizationTypesRepositoryInMemory,
    );
  });

  it('should be abe to list all organization typess', async () => {
    const organizationType = await organizationTypesRepositoryInMemory.create({
      name: 'Organization Types',
    });

    const organizationTypes = await listOrganizationsTypeUseCase.execute();

    expect(organizationTypes).toEqual([organizationType]);
  });
});
