import { IDonationDTO } from '@modules/donations/dtos/IDonationDTO';
import { DonationsRepositoryInMemory } from '@modules/donations/repositories/in-memory/DonationRepositoryInMemory';
import { OrganizationsRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationRepositoryInMemory';

import { FilterDonationUseCase } from './FilterUseCase';

let filterDonationUseCase: FilterDonationUseCase;
let donationsRepositoryInMemory: DonationsRepositoryInMemory;
let organizationsRepositoryInMemory: OrganizationsRepositoryInMemory;

describe('List Donation', () => {
  beforeEach(() => {
    donationsRepositoryInMemory = new DonationsRepositoryInMemory();
    organizationsRepositoryInMemory = new OrganizationsRepositoryInMemory();
    filterDonationUseCase = new FilterDonationUseCase(donationsRepositoryInMemory);
  });

  it('should be abe to filter donation for name', async () => {
    const organization = await organizationsRepositoryInMemory.create({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 'id',
    });

    const newDonation1 = {
      name: 'Donation Name',
      description: 'Test Donation',
      total_value: 123,
      organization_id: organization.id,
    };

    const newDonation2 = {
      name: 'Donation Name',
      description: 'Test Donation',
      total_value: 123,
      organization_id: organization.id,
    };

    await donationsRepositoryInMemory.create(newDonation1);
    await donationsRepositoryInMemory.create(newDonation2);

    const donation = await filterDonationUseCase.execute({ name: 'Donation' });

    expect(donation.length).toBe(2);
  });

  it('should be abe to filter donation for name and organization', async () => {
    const organization = await organizationsRepositoryInMemory.create({
      name: 'Organization Name',
      email: 'organization1@beeheroes.com',
      cnpj: '000000000001',
      description: 'Description Organization',
      organization_type_id: 'id',
    });

    const newDonation1: IDonationDTO = {
      name: 'Donation Name',
      description: 'Test Donation',
      total_value: 123,
      organization_id: organization.id,
    };

    const newDonation2: IDonationDTO = {
      name: 'Donation Name',
      description: 'Test Donation',
      total_value: 123,
      organization_id: organization.id,
    };

    await donationsRepositoryInMemory.create(newDonation1);
    await donationsRepositoryInMemory.create(newDonation2);

    const donation = await filterDonationUseCase
      .execute({ name: 'Donation', organization_id: organization.id });

    expect(donation.length).toBe(2);
  });
});
