import { getRepository, Repository } from 'typeorm';

import { IOrganizationTypeDTO } from '@modules/organizations/dtos/IOrganizationTypeDTO';
import { IOrganizationTypesRepository } from '@modules/organizations/repositories/IOrganizationTypesRepository';
import { OrganizationType } from '../entities/OrganizationType';

class OrganizationTypesRepository implements IOrganizationTypesRepository{
  private repository: Repository<OrganizationType>

  constructor() {
    this.repository = getRepository(OrganizationType);
  }

  async create({ name, description }: IOrganizationTypeDTO): Promise<OrganizationType> {
    const organizationType = this.repository.create({
      name,
      description
    });
    await this.repository.save(organizationType);

    return organizationType;
  }

  async list(): Promise<OrganizationType[]> {
    const organizationType = await this.repository.find();
    return organizationType;
  }

  async findByName(name: string): Promise<OrganizationType> {
    const organizationType = await this.repository.findOne({ name });
    return organizationType;
  }

  async findById(id: string): Promise<OrganizationType> {
    const organizationType = await this.repository.findOne({ id });
    return organizationType;
  }

  async update({ id, name, description }: IOrganizationTypeDTO): Promise<OrganizationType> {

    const setOrganizationType: IOrganizationTypeDTO = {};

    if(name) setOrganizationType.name = name;
    if(description) setOrganizationType.description = description;

    const organizationTypeEdited = await this.repository
      .createQueryBuilder()
      .update()
      .set(setOrganizationType)
      .where('id = :id')
      .setParameters({ id })
      .execute();

      return organizationTypeEdited.raw;
  }

  async delete( id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { OrganizationTypesRepository }