import { IOrganizationDTO } from '../dtos/IOrganizationDTO';
import { Organization } from '../infra/typeorm/entities/Organization';

interface IOrganizationsRepository{
  create({
    name,
    email,
    description,
    cnpj,
    organization_type_id
  }: IOrganizationDTO): Promise<Organization>;
  findByEmail(email: string): Promise<Organization>;
  findById(id: string): Promise<Organization>;
  listOrganizationsByOrganizationType(organization_type_id: string): Promise<Organization[]>;
  list(): Promise<Organization[]>
  filter({
    name,
    email,
    description,
    cnpj,
    organization_type_id
  }: IOrganizationDTO): Promise<Organization[]>;
  update({
    id,
    name,
    email,
    description,
    cnpj,
    organization_type_id
  }: IOrganizationDTO): Promise<Organization>;
}

export { IOrganizationsRepository }