import { instanceToInstance } from 'class-transformer';

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
    });
    return user;
  }
}

export { OrganizationMap };