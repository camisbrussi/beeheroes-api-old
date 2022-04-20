import { Phone } from '@modules/addresses/infra/typeorm/entities/Phone';
import { Donation } from '@modules/donations/infra/typeorm/entities/Donation';
import { Project } from '@modules/projects/infra/typeorm/entities/Project';

import { IOrganizationDTO } from '../dtos/IOrganizationDTO';
import { Organization } from '../infra/typeorm/entities/Organization';
import { OrganizationImage } from '../infra/typeorm/entities/OrganizationImages';

interface IOrganizationsRepository{
  create({
    name,
    email,
    description,
    cnpj,
    organization_type_id,
    address_id,
  }: IOrganizationDTO): Promise<Organization>;
  findByEmail(email: string): Promise<Organization>;
  findById(id: string): Promise<
    {
      organization: Organization,
      images: OrganizationImage[],
      projects: Project[],
      donations: Donation[],
      phones: Phone[],
    }>;
  findByCnpj(cnpj: string): Promise<Organization>;
  findByUser(id: string): Promise<Organization>;
  listOrganizationsByOrganizationType(organization_type_id: string): Promise<Organization[]>;
  filter({
    name,
    status,
    organization_type_id,
    state_id,
    city_id,
  }): Promise<Organization[]>;
  update({
    id,
    name,
    email,
    description,
    cnpj,
    organization_type_id,
    address_id,
  }: IOrganizationDTO): Promise<Organization>;
}

export { IOrganizationsRepository };
