import { OrganizationsRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationRepositoryInMemory';

import { ListOrganizationsUseCase } from './ListUseCase';

let listOrganizationsUseCase: ListOrganizationsUseCase;
let organizationsRepositoryInMemory: OrganizationsRepositoryInMemory;

describe('List Organization', () => {
  beforeEach(() => {
    organizationsRepositoryInMemory = new OrganizationsRepositoryInMemory();
    listOrganizationsUseCase = new ListOrganizationsUseCase(organizationsRepositoryInMemory);
  });

  it('should be abe to list all organization', async () => {
    const newOrganization = await organizationsRepositoryInMemory.create({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 'id',
    });

    const organization = await listOrganizationsUseCase.execute();

    expect(organization).toEqual([newOrganization]);
  });
});
