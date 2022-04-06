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
    id: string;
    name: string;
    description: string;
  };
  address: {
    id: string;
    street: string;
    number: string;
    complement: string;
    district: string;
    cep: number;
    city: {
      id: number;
      name: string;
      state: {
        id: number;
        name: string;
        uf: string;
      }
    }
  };
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
