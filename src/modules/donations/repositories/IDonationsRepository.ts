import { IDonationDTO } from '../dtos/IDonationDTO';
import { Donation } from '../infra/typeorm/entities/Donation';

interface IDonationsRepository{
  create({
    name,
    description,
    total_value,
    total_collected,
    organization_id,
  }: IDonationDTO): Promise<Donation>;
  findByOrganizationId(organization_id: string): Promise<Donation[]>;
  findById(id: string): Promise<Donation>;
  filter({
    name,
    status,
    organization_id,
  }: IDonationDTO): Promise<Donation[]>;
  update({
    id,
    name,
    description,
    total_value,
    total_collected,
    status,
  }: IDonationDTO): Promise<Donation>;
}

export { IDonationsRepository };
