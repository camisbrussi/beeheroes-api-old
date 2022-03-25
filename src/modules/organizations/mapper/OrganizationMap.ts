import { instanceToInstance } from 'class-transformer';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Phone } from '@modules/addresses/infra/typeorm/entities/Phone';
import { Donation } from '@modules/donations/infra/typeorm/entities/Donation';
import { Project } from '@modules/projects/infra/typeorm/entities/Project';

import { IOrganizationDTO } from '../dtos/IOrganizationDTO';

type Responsible = {
    user_id: string;
    name: string;
    avatar_url: string;
}

type Organization = {
  id: string;
  status: number;
  name: string;
  description: string;
  email: string;
  cnpj: string;
  avatar_url: string;
  organization_type: {
    name: string;
    description: string;
  };
  address: {
    street: string;
    number: string;
    complement: string;
    district: string;
    cep: number;
    city: string;
    uf: string;
  }
  images_url: string[],
  phones: Phone[],
  projects: Project[],
  donations: Donation[],
  responsibles: Responsible[],
}

class OrganizationMap {
  static toDTO({
    id,
    status,
    name,
    description,
    email,
    cnpj,
    avatar_url,
    organization_type,
    address,
    images_url,
    phones,
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
      avatar_url,
      organization_type,
      address,
      images_url,
      phones,
      projects,
      donations,
      responsibles,
    });
    return organization;
  }
}

export { OrganizationMap };
