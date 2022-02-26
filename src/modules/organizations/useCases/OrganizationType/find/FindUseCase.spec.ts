import { OrganizationsRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationRepositoryInMemory';

import { FindOrganizationUseCase } from '../../Organization/find/FindUseCase';

let findOrganizationsUseCase: FindOrganizationUseCase;
let organizationsRepositoryInMemory: OrganizationsRepositoryInMemory;

describe('List Organizations ', () => {
  beforeEach(() => {
    organizationsRepositoryInMemory = new OrganizationsRepositoryInMemory();
    findOrganizationsUseCase = new FindOrganizationUseCase(organizationsRepositoryInMemory);
  });

  it('should be abe to find organization for id', async () => {
    const organization = {
      name: 'Organization',
      email: 'admin@beeheroes.com',
      password: '123',
      organization_type_id: 'admin',
    };

    const { id } = await organizationsRepositoryInMemory.create(organization);

    const organizations = await findOrganizationsUseCase.execute(id);

    expect(organizations.id).toEqual(id);
  });
});
