import { IOrganizationDTO } from '@modules/organizations/dtos/IOrganizationDTO';
import { OrganizationsRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationRepositoryInMemory';

import { FilterOrganizationUseCase } from './FilterUseCase';

let filterOrganizationUseCase: FilterOrganizationUseCase;
let organizationsRepositoryInMemory: OrganizationsRepositoryInMemory;

describe('List Organization', () => {
  beforeEach(() => {
    organizationsRepositoryInMemory = new OrganizationsRepositoryInMemory();
    filterOrganizationUseCase = new FilterOrganizationUseCase(organizationsRepositoryInMemory);
  });

  it('should be abe to filter organization for name', async () => {
    const newOrganization1: IOrganizationDTO = {
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 1,
    };

    const newOrganization2: IOrganizationDTO = {
      name: 'Organization Name',
      email: 'organization2@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 1,
    };

    await organizationsRepositoryInMemory.create(newOrganization1);
    await organizationsRepositoryInMemory.create(newOrganization2);

    const organization = await filterOrganizationUseCase.execute({ name: 'Organization' });

    expect(organization.length).toBe(2);
  });

  it('should be abe to filter organization for name and organization type', async () => {
    const newOrganization1: IOrganizationDTO = {
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 1,
    };

    const newOrganization2: IOrganizationDTO = {
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 1,
    };

    await organizationsRepositoryInMemory.create(newOrganization1);
    await organizationsRepositoryInMemory.create(newOrganization2);

    const organization = await filterOrganizationUseCase.execute({ name: 'Organization', organization_type_id: 1 });

    expect(organization.length).toBe(2);
  });
});
