import { DonationsRepositoryInMemory } from '@modules/donations/repositories/in-memory/DonationRepositoryInMemory';
import { OrganizationsRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationRepositoryInMemory';

import { ListDonationsUseCase } from './ListUseCase';

let listDonationsUseCase: ListDonationsUseCase;
let donationsRepositoryInMemory: DonationsRepositoryInMemory;
let organizationsRepositoryInMemory: OrganizationsRepositoryInMemory;

describe('List Donation', () => {
  beforeEach(() => {
    donationsRepositoryInMemory = new DonationsRepositoryInMemory();
    organizationsRepositoryInMemory = new OrganizationsRepositoryInMemory();
    listDonationsUseCase = new ListDonationsUseCase(donationsRepositoryInMemory);
  });

  it('should be abe to list all donation', async () => {
    const organization = await organizationsRepositoryInMemory.create({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 'id',
    });

    const newDonation = await donationsRepositoryInMemory.create({
      name: 'Donation Name',
      description: 'Test Donation',
      total_value: 123,
      organization_id: organization.id,
    });

    const donation = await listDonationsUseCase.execute();

    expect(donation).toEqual([newDonation]);
  });
});
