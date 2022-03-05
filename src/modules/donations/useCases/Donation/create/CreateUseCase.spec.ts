import { DonationsRepositoryInMemory } from '@modules/donations/repositories/in-memory/DonationRepositoryInMemory';
import { OrganizationsRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateDonationUseCase } from './CreateUseCase';

let createDonationUseCase: CreateDonationUseCase;
let donationsRepositoryInMemory: DonationsRepositoryInMemory;
let organizationsRepositoryInMemory: OrganizationsRepositoryInMemory;

beforeEach(() => {
  donationsRepositoryInMemory = new DonationsRepositoryInMemory();
  organizationsRepositoryInMemory = new OrganizationsRepositoryInMemory();
  createDonationUseCase = new CreateDonationUseCase(
    donationsRepositoryInMemory,
    organizationsRepositoryInMemory,
  );
});

describe('Create Donation ', () => {
  it('should be able to create a new donation ', async () => {
    const organization = await organizationsRepositoryInMemory.create({
      name: 'Organization Name',
      email: 'organization@beeheroes.com',
      cnpj: '000000000000',
      description: 'Description Organization',
      organization_type_id: 'id',
    });

    const donation = {
      name: 'Donation Name',
      description: 'Test Donation',
      total_value: 123,
      organization_id: organization.id,
    };

    const createDonation = await createDonationUseCase.execute(donation);

    expect(createDonation.name).toEqual(donation.name);
  });

  it('should be able to create a donation with status active by default', async () => {
    const organization = await organizationsRepositoryInMemory.create({
      name: 'Organization Name',
      email: 'organization1@beeheroes.com',
      cnpj: '000000000001',
      description: 'Description Organization',
      organization_type_id: 'id',
    });

    const donation = await createDonationUseCase.execute({
      name: 'Donation Name',
      description: 'Test Donation',
      total_value: 123,
      organization_id: organization.id,
    });

    expect(donation.status).toEqual(Number(process.env.DONATION_ACTIVE));
  });

  it('should not be able to create a new donation case organization does not exists', async () => {
    await expect(
      createDonationUseCase.execute({
        name: 'Donation Name',
        description: 'Test Donation',
        total_value: 123,
        organization_id: 'idtest',
      }),
    ).rejects.toEqual(new AppError('Organization does not exists!'));
  });
});
