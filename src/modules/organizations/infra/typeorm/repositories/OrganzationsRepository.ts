import { getRepository, Repository } from 'typeorm';

import { IOrganizationDTO } from '@modules/organizations/dtos/IOrganizationDTO';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationRepository';

import { Organization } from '../entities/Organization';

class OrganizationsRepository implements IOrganizationsRepository {
  private repository: Repository<Organization>

  constructor() {
    this.repository = getRepository(Organization);
  }

  async create({
    name,
    email,
    description,
    cnpj,
    organization_type_id,
  }: IOrganizationDTO): Promise<Organization> {
    const organization = this.repository.create({
      name,
      email,
      description,
      cnpj,
      organization_type_id,
    });

    await this.repository.save(organization);

    return organization;
  }

  async findByEmail(email: string): Promise<Organization> {
    const organization = await this.repository.findOne({ email });

    return organization;
  }

  async findById(id: string): Promise<Organization> {
    const organization = await this.repository.findOne({ id });

    return organization;
  }

  async list(): Promise<Organization[]> {
    const organization = await this.repository.find();
    return organization;
  }

  async listOrganizationsByOrganizationType(organization_type_id: string): Promise<Organization[]> {
    const organizations = await this.repository.find({ organization_type_id });

    return organizations;
  }

  async filter({
    name,
    email,
    status,
    organization_type_id,
    cnpj,
  }: IOrganizationDTO): Promise<Organization[]> {
    const organizationsQuery = await this.repository
      .createQueryBuilder('u')
      .where('1 = 1');

    if (name) {
      organizationsQuery.andWhere('name like :name', { name: `%${name}%` });
    }

    if (email) {
      organizationsQuery.andWhere('email like :email', { email: `%${email}%` });
    }

    if (status) {
      organizationsQuery.andWhere('status = :status', { status });
    }

    if (cnpj) {
      organizationsQuery.andWhere('cnpj = :cnpj', { cnpj });
    }

    if (organization_type_id) {
      organizationsQuery.andWhere('organization_type_id = :organization_type_id', { organization_type_id });
    }

    const organizations = await organizationsQuery.getMany();

    return organizations;
  }

  async update({
    id,
    name,
    email,
    description,
    cnpj,
    status,
    organization_type_id,
  }: IOrganizationDTO): Promise<Organization> {
    const setOrganization: IOrganizationDTO = { };

    if (name) setOrganization.name = name;
    if (email) setOrganization.email = email;
    if (description) setOrganization.email = description;
    if (cnpj) setOrganization.email = cnpj;
    if (status) setOrganization.status = status;
    if (organization_type_id) setOrganization.organization_type_id = organization_type_id;

    const organizationTypeEdited = await this.repository
      .createQueryBuilder()
      .update()
      .set(setOrganization)
      .where('id = :id')
      .setParameters({ id })
      .execute();

    return organizationTypeEdited.raw;
  }
}

export { OrganizationsRepository };
