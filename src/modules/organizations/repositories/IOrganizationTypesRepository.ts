import { IOrganizationTypeDTO } from '../dtos/IOrganizationTypeDTO';
import { OrganizationType } from '../infra/typeorm/entities/OrganizationType';

interface IOrganizationTypesRepository {
  create({ name, description }: IOrganizationTypeDTO): Promise<OrganizationType>;
  findByName(name: string): Promise<OrganizationType>;
  findById(id: string): Promise<OrganizationType>;
  list(): Promise<OrganizationType[]>;
  update({ id, name, description }: IOrganizationTypeDTO): Promise<OrganizationType>
  delete(id: string): Promise<void>;
}

export { IOrganizationTypesRepository };
