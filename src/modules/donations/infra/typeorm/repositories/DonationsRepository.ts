import { getRepository, Repository } from 'typeorm';

import { IDonationDTO } from '@modules/donations/dtos/IDonationDTO';
import { IDonationsRepository } from '@modules/donations/repositories/IDonationsRepository';

import { Donation } from '../entities/Donation';

class DonationsRepository implements IDonationsRepository {
  private donationsRepository: Repository<Donation>

  constructor() {
    this.donationsRepository = getRepository(Donation);
  }

  async create({
    name,
    description,
    total_value,
    total_collected,
    organization_id,
    status,
  }: IDonationDTO): Promise<Donation> {
    const donation = this.donationsRepository.create({
      name,
      description,
      total_value,
      total_collected,
      organization_id,
      status,
    });

    await this.donationsRepository.save(donation);

    return donation;
  }

  async findByOrganizationId(organization_id: string): Promise<Donation[]> {
    const donations = await this.donationsRepository.find({ organization_id });

    return donations;
  }

  async findById(id: string): Promise<Donation> {
    const donation = await this.donationsRepository
      .createQueryBuilder('donation')
      .leftJoinAndSelect('donation.organization', 'organizations')
      .leftJoinAndSelect('organizations.organizationType', 'organizationType')
      .leftJoinAndSelect('organizations.address', 'address')
      .leftJoinAndSelect('address.city', 'cities')
      .leftJoinAndSelect('cities.state', 'state')
      .where('donation.id = :id', { id })
      .getOne();

    return donation;
  }

  async filter({
    name,
    status,
    organization_id,
    state_id,
    city_id,
    organization_type_id,
  }): Promise<Donation[]> {
    const donationsQuery = await this.donationsRepository
      .createQueryBuilder('donation')
      .leftJoinAndSelect('donation.organization', 'organizations')
      .leftJoinAndSelect('organizations.address', 'addresses')
      .leftJoinAndSelect('addresses.city', 'cities')
      .leftJoinAndSelect('cities.state', 'states')
      .where('1 = 1');

    if (name) {
      donationsQuery.andWhere('donation.name ilike :name', { name: `%${name}%` });
    }

    if (status) {
      donationsQuery.andWhere('donation.status = :status', { status });
    }

    if (city_id) {
      donationsQuery.andWhere('cities.id = :city_id', { city_id });
    }

    if (state_id) {
      donationsQuery.andWhere('states.id = :state_id', { state_id });
    }

    if (organization_type_id) {
      donationsQuery.andWhere('organizations.organization_type_id = :organization_type_id', { organization_type_id });
    }

    if (organization_id) {
      donationsQuery.andWhere('donation.organization_id = :organization_id', { organization_id });
    }

    const donations = await donationsQuery.getMany();

    return donations;
  }

  async update({
    id,
    name,
    description,
    total_value,
    total_collected,
    status,
  }: IDonationDTO): Promise<Donation> {
    const setDonation: IDonationDTO = { };

    console.log(total_collected);

    if (name) setDonation.name = name;
    if (total_value) setDonation.total_value = total_value;
    if (description) setDonation.description = description;
    if (total_collected !== null
      && total_collected !== undefined) setDonation.total_collected = total_collected;
    if (status) setDonation.status = status;

    const donationTypeEdited = await this.donationsRepository
      .createQueryBuilder()
      .update()
      .set(setDonation)
      .where('id = :id')
      .setParameters({ id })
      .execute();

    return donationTypeEdited.raw;
  }
}

export { DonationsRepository };
