import { instanceToInstance } from 'class-transformer';

import { Phone } from '@modules/addresses/infra/typeorm/entities/Phone';
import { Donation } from '@modules/donations/infra/typeorm/entities/Donation';
import { Project } from '@modules/projects/infra/typeorm/entities/Project';

import { IOrganizationDTO } from '../dtos/IOrganizationDTO';

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
  }: Organization): IOrganizationDTO {
    const user = instanceToInstance({
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
    });
    return user;
  }
}

export { OrganizationMap };
