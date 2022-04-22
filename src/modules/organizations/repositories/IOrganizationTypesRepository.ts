import { IOrganizationTypeDTO } from '../dtos/IOrganizationTypeDTO';
import { OrganizationType } from '../infra/typeorm/entities/OrganizationType';

interface IOrganizationTypesRepository {
  create({ name }: IOrganizationTypeDTO): Promise<OrganizationType>;
  findByName(name: string): Promise<OrganizationType>;
  findById(id: number): Promise<OrganizationType>;
  list(): Promise<OrganizationType[]>;
  update({ id, name }: IOrganizationTypeDTO): Promise<OrganizationType>
  delete(id: number): Promise<void>;
}

export { IOrganizationTypesRepository };
