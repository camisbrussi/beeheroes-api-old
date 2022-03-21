import { getRepository, Repository } from 'typeorm';

import { Phone } from '@modules/addresses/infra/typeorm/entities/Phone';
import { IOrganizationDTO } from '@modules/organizations/dtos/IOrganizationDTO';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';

import { Organization } from '../entities/Organization';
import { OrganizationImage } from '../entities/OrganizationImages';

class OrganizationsRepository implements IOrganizationsRepository {
  private organizationsRepository: Repository<Organization>
  private phonesRepository: Repository<Phone>
  private organizationImageRepository: Repository<OrganizationImage>

  constructor() {
    this.organizationsRepository = getRepository(Organization);
    this.phonesRepository = getRepository(Phone);
  }

  async create({
    id,
    name,
    email,
    description,
    cnpj,
    organization_type_id,
    users,
    address_id,
    avatar,
  }: IOrganizationDTO): Promise<Organization> {
    const organization = this.organizationsRepository.create({
      id,
      name,
      email,
      description,
      cnpj,
      organization_type_id,
      users,
      address_id,
      avatar,
    });

    await this.organizationsRepository.save(organization);

    return organization;
  }

  async findByEmail(email: string): Promise<Organization> {
    const organization = await this.organizationsRepository.findOne({ email });

    return organization;
  }

  async findById(id: string): Promise<{
    organization: Organization,
    phones: Phone[],
    }> {
    const organization = await this.organizationsRepository
      .createQueryBuilder('organization')
      .leftJoinAndSelect('organization.organizationType', 'organizationType')
      .leftJoinAndSelect('organization.address', 'address')
      .leftJoinAndSelect('address.city', 'cities')
      .leftJoinAndSelect('cities.state', 'state')
      .where('organization.id = :id', { id })
      .getOne();

    const phones = await this.phonesRepository
      .createQueryBuilder('phone')
      .where('phone.organization_id = :organization_id', { organization_id: id })
      .getMany();

    return {
      organization,
      phones,
    };
  }

  async findByCnpj(cnpj: string): Promise<Organization> {
    const organization = await this.organizationsRepository.createQueryBuilder('organization')
      .leftJoinAndSelect('organization.address', 'address')
      .where('organization.cnpj =:cnpj', { cnpj })
      .getOne();

    return organization;
  }

  async listOrganizationsByOrganizationType(organization_type_id: string): Promise<Organization[]> {
    const organizations = await this.organizationsRepository.find({ organization_type_id });

    return organizations;
  }

  async filter({
    name,
    email,
    status,
    organization_type_id,
    cnpj,
  }: IOrganizationDTO): Promise<Organization[]> {
    const organizationsQuery = await this.organizationsRepository
      .createQueryBuilder('organization')
      .leftJoinAndSelect('organization.address', 'addresses')
      .leftJoinAndSelect('addresses.city', 'cities')
      .leftJoinAndSelect('cities.state', 'states')
      .where('1 = 1');

    if (name) {
      organizationsQuery.andWhere('organization.name like :name', { name: `%${name}%` });
    }

    if (email) {
      organizationsQuery.andWhere('organization.email like :email', { email: `%${email}%` });
    }

    if (status) {
      organizationsQuery.andWhere('organization.status = :status', { status });
    }

    if (cnpj) {
      organizationsQuery.andWhere('organization.cnpj = :cnpj', { cnpj });
    }

    if (organization_type_id) {
      organizationsQuery.andWhere('organization.organization_type_id = :organization_type_id', { organization_type_id });
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
    address_id,
  }: IOrganizationDTO): Promise<Organization> {
    const setOrganization: IOrganizationDTO = { };

    if (name) setOrganization.name = name;
    if (email) setOrganization.email = email;
    if (description) setOrganization.description = description;
    if (cnpj) setOrganization.cnpj = cnpj;
    if (status) setOrganization.status = status;
    if (organization_type_id) setOrganization.organization_type_id = organization_type_id;
    if (address_id) setOrganization.address_id = address_id;

    const organizationTypeEdited = await this.organizationsRepository
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
