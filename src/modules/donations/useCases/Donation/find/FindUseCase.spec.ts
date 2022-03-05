import { DonationsRepositoryInMemory } from '@modules/donations/repositories/in-memory/DonationRepositoryInMemory';
import { OrganizationsRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationRepositoryInMemory';

import { FindDonationUseCase } from './FindUseCase';

let findDonationUseCase: FindDonationUseCase;
let donationsRepositoryInMemory: DonationsRepositoryInMemory;
let organizationsRepositoryInMemory: OrganizationsRepositoryInMemory;

describe('List Donation', () => {
  beforeEach(() => {
    donationsRepositoryInMemory = new DonationsRepositoryInMemory();
    organizationsRepositoryInMemory = new OrganizationsRepositoryInMemory();
    findDonationUseCase = new FindDonationUseCase(donationsRepositoryInMemory);
  });

  it('should be abe to find donation', async () => {
    const organization = await organizationsRepositoryInMemory.create({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 'id',
    });

    const newDonation = {
      name: 'Donation Name',
      description: 'Test Donation',
      total_value: 123,
      organization_id: organization.id,
    };

    const { id } = await donationsRepositoryInMemory.create(newDonation);

    const donation = await findDonationUseCase.execute(id);

    expect(donation.id).toEqual(id);
  });
});
