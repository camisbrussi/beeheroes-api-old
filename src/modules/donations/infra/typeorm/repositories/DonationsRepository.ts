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
  }: IDonationDTO): Promise<Donation> {
    const donation = this.donationsRepository.create({
      name,
      description,
      total_value,
      total_collected,
      organization_id,
    });

    await this.donationsRepository.save(donation);

    return donation;
  }

  async findByOrganizationId(organization_id: string): Promise<Donation[]> {
    const donations = await this.donationsRepository.find({ organization_id });

    return donations;
  }

  async findById(id: string): Promise<Donation> {
    const donation = await this.donationsRepository.findOne({ id });

    return donation;
  }

  async list(): Promise<Donation[]> {
    const donation = await this.donationsRepository.find();
    return donation;
  }

  async filter({
    name,
    status,
    organization_id,
  }: IDonationDTO): Promise<Donation[]> {
    const donationsQuery = await this.donationsRepository
      .createQueryBuilder('u')
      .where('1 = 1');

    if (name) {
      donationsQuery.andWhere('name like :name', { name: `%${name}%` });
    }

    if (status) {
      donationsQuery.andWhere('status = :status', { status });
    }

    if (organization_id) {
      donationsQuery.andWhere('organization_id = :organization_id', { organization_id });
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

    if (name) setDonation.name = name;
    if (total_value) setDonation.total_value = total_value;
    if (description) setDonation.description = description;
    if (total_collected) setDonation.total_collected = total_collected;
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
