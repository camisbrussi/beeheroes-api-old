import { DonationsRepositoryInMemory } from '@modules/donations/repositories/in-memory/DonationRepositoryInMemory';
import { OrganizationsRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationRepositoryInMemory';

import { UpdateDonationUseCase } from './UpdateUseCase';

let updateDonationUseCase: UpdateDonationUseCase;
let donationsRepositoryInMemory: DonationsRepositoryInMemory;
let organizationsRepositoryInMemory: OrganizationsRepositoryInMemory;

describe('Update Type Donation', () => {
  beforeEach(() => {
    donationsRepositoryInMemory = new DonationsRepositoryInMemory();
    organizationsRepositoryInMemory = new OrganizationsRepositoryInMemory();
    updateDonationUseCase = new UpdateDonationUseCase(
      donationsRepositoryInMemory,
    );
  });

  it('should be able to edit a donation', async () => {
    const organization = await organizationsRepositoryInMemory.create({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 1,
    });

    const donation = await donationsRepositoryInMemory.create({
      name: 'Donation Name',
      description: 'Test Donation',
      total_value: 123,
      organization_id: organization.id,
    });

    const donationEdit = {
      id: donation.id,
      name: 'Donation Name edited',
      total_value: 654,
      status: Number(process.env.DONATION_STATUS_FINISHED),
    };

    const editedDonation = await updateDonationUseCase.execute(donationEdit);

    expect(editedDonation.name).toEqual(donationEdit.name);
    expect(editedDonation.total_value).toEqual(donationEdit.total_value);
    expect(editedDonation.status).toEqual(donationEdit.status);
  });
});
