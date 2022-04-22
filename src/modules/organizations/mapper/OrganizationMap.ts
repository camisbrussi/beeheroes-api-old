import { instanceToInstance } from 'class-transformer';

import { Address } from '@modules/addresses/infra/typeorm/entities/Address';
import { Phone } from '@modules/addresses/infra/typeorm/entities/Phone';
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
    id: number;
    name: string;
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
  images_url?: string[],
  projects?: Project[],
  donations?: Donation[],
  responsibles?: Responsible[],
  phones?: Phone[],
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
    phones,
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
      phones,
    });
    return organization;
  }
}

export { OrganizationMap };
