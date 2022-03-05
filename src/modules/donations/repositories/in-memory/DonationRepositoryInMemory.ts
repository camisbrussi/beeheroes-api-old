import { IDonationDTO } from '@modules/donations/dtos/IDonationDTO';
import { Donation } from '@modules/donations/infra/typeorm/entities/Donation';

import { IDonationsRepository } from '../IDonationsRepository';

class DonationsRepositoryInMemory implements IDonationsRepository {
  donations: Donation[] = [];

  async create({
    id,
    name,
    description,
    total_value,
    total_collected,
    organization_id,
  }: IDonationDTO): Promise<Donation> {
    const donation = new Donation();

    Object.assign(donation, {
      id,
      name,
      description,
      total_value,
      total_collected,
      organization_id,
    });

    this.donations.push(donation);

    return (donation);
  }

  async findByOrganizationId(organization_id: string): Promise<Donation[]> {
    const donations = this.donations
      .filter((donation) => organization_id.includes(donation.organization_id));

    return donations;
  }

  async findById(id: string): Promise<Donation> {
    const donation = this.donations.find((donation) => donation.id === id);

    return donation;
  }

  async filter({
    name,
    status,
    organization_id,
  }: IDonationDTO): Promise<Donation[]> {
    const donations = this.donations.filter((donation) => {
      if ((name && donation.name.includes(name))
        || (status && donation.status === status)
        || (organization_id && donation.organization_id === organization_id)
      ) {
        return donation;
      }
      return null;
    });

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
    const findIndex = this.donations.findIndex((donation) => donation.id === id);

    if (name) this.donations[findIndex].name = name;
    if (total_value) this.donations[findIndex].total_value = total_value;
    if (description) this.donations[findIndex].description = description;
    if (total_collected) this.donations[findIndex].total_collected = total_collected;
    if (status) this.donations[findIndex].status = status;

    return this.donations[findIndex];
  }

  async list(): Promise<Donation[]> {
    const all = this.donations;
    return all;
  }
}

export { DonationsRepositoryInMemory };
