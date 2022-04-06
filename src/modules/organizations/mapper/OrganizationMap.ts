import { instanceToInstance } from 'class-transformer';

import { Address } from '@modules/addresses/infra/typeorm/entities/Address';
import { Donation } from '@modules/donations/infra/typeorm/entities/Donation';
import { Project } from '@modules/projects/infra/typeorm/entities/Project';

import { IOrganizationDTO } from '../dtos/IOrganizationDTO';

type Responsible = {
    user_id: string;
    name: string;
    avatar: string;
}

type Organization = {
  id: string;
  status: number;
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
    number: number;
    complement: string;
    district: string;
    cep: string;
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
  images_url?: string[],
  projects?: Project[],
  donations?: Donation[],
  responsibles?: Responsible[],
}

class OrganizationMap {
  static toDTO({
    id,
    status,
    name,
    description,
    email,
    cnpj,
    avatar,
    organization_type,
    address,
    images_url,
    projects,
    donations,
    responsibles,
  }: Organization): IOrganizationDTO {
    const organization = instanceToInstance({
      id,
      status,
      name,
      description,
      email,
      cnpj,
      avatar,
      organization_type,
      address,
      images_url,
      projects,
      donations,
      responsibles,
    });
    return organization;
  }
}

export { OrganizationMap };
