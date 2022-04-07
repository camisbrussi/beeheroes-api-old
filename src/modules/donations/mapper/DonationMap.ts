import { instanceToInstance } from 'class-transformer';

import { IDonationDTO } from '../dtos/IDonationDTO';

type Donation = {
  id: string;
  name: string;
  description: string;
  total_value: number;
  total_collected: number;
  status: number;
  organization_id: string;
}

class DonationMap {
  static toDTO({
    id,
    name,
    description,
    total_value,
    total_collected,
    status,
    organization_id,
  }: Donation): IDonationDTO {
    const project = instanceToInstance({
      id,
      name,
      description,
      total_value,
      total_collected,
      status,
      organization_id,
    });
    return project;
  }
}

export { DonationMap };
