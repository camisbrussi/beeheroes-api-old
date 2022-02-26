import { OrganizationsRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationRepositoryInMemory';

import { FindOrganizationUseCase } from './FindUseCase';

let findOrganizationUseCase: FindOrganizationUseCase;
let organizationsRepositoryInMemory: OrganizationsRepositoryInMemory;

describe('List Organization', () => {
  beforeEach(() => {
    organizationsRepositoryInMemory = new OrganizationsRepositoryInMemory();
    findOrganizationUseCase = new FindOrganizationUseCase(organizationsRepositoryInMemory);
  });

  it('should be abe to find organization', async () => {
    const newOrganization = {
      name: 'Organization',
      email: 'teste@beeheroes',
      password: 'test',
      organization_type_id: 'test',
    };

    const { id } = await organizationsRepositoryInMemory.create(newOrganization);

    const organization = await findOrganizationUseCase.execute(id);

    expect(organization.id).toEqual(id);
  });
});
