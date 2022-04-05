import { instanceToInstance } from 'class-transformer';

import { IDonationDTO } from '../dtos/IDonationDTO';

type Donation = {
  id: string;
  name: string;
  description: string;
  total_value: number;
  total_collected: number;
  status: number;
  organization: {
    id: string;
    name: string;
    description: string;
    email: string;
    cnpj: string;
    avatar: string;
    organization_type: {
      name: string;
    };
    address: {
      city: string;
      uf: string;
    }
  };
}

class DonationMap {
  static toDTO({
    id,
    name,
    description,
    total_value,
    total_collected,
    status,
    organization,
  }: Donation): IDonationDTO {
    const project = instanceToInstance({
      id,
      name,
      description,
      total_value,
      total_collected,
      status,
      organization,
    });
    return project;
  }
}

export { DonationMap };
