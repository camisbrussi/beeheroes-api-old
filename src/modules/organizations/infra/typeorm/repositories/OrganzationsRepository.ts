import { getRepository, Repository } from 'typeorm';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Phone } from '@modules/addresses/infra/typeorm/entities/Phone';
import { Donation } from '@modules/donations/infra/typeorm/entities/Donation';
import { IOrganizationDTO } from '@modules/organizations/dtos/IOrganizationDTO';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { Project } from '@modules/projects/infra/typeorm/entities/Project';
import { Subscription } from '@modules/projects/infra/typeorm/entities/Subscription';

import { Organization } from '../entities/Organization';
import { OrganizationImage } from '../entities/OrganizationImages';

class OrganizationsRepository implements IOrganizationsRepository {
  private organizationsRepository: Repository<Organization>
  private organizationImageRepository: Repository<OrganizationImage>
  private projectRepository: Repository<Project>
  private donationRepository: Repository<Donation>
  private subscriptionsRepository: Repository<Subscription>
  private phonesRepository: Repository<Phone>

  constructor() {
    this.organizationsRepository = getRepository(Organization);
    this.organizationImageRepository = getRepository(OrganizationImage);
    this.projectRepository = getRepository(Project);
    this.donationRepository = getRepository(Donation);
    this.subscriptionsRepository = getRepository(Subscription);
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
    images: OrganizationImage[],
    projects: Project[],
    donations: Donation[],
    phones: Phone[],
    }> {
    const organization = await this.organizationsRepository
      .createQueryBuilder('organization')
      .leftJoinAndSelect('organization.organizationType', 'organizationType')
      .leftJoinAndSelect('organization.address', 'address')
      .leftJoinAndSelect('address.city', 'cities')
      .leftJoinAndSelect('cities.state', 'state')
      .leftJoinAndSelect('organization.users', 'user')
      .where('organization.id = :id', { id })
      .getOne();

    const images = await this.organizationImageRepository
      .createQueryBuilder('image')
      .where('image.organization_id = :organization_id', { organization_id: id })
      .getMany();

    const projects = await this.projectRepository
      .createQueryBuilder('project')
      .where('project.organization_id = :organization_id', { organization_id: id })
      .where('project.status =:status', { status: Number(process.env.PROJECT_STATUS_ACTIVE) })
      .limit(3)
      .getMany();

    projects.map(async (project, index) => {
      const totalSubscription = await this.subscriptionsRepository
        .count({ project_id: project.id });

      projects[index].total_subscription = totalSubscription;
    });

    const donations = await this.donationRepository
      .createQueryBuilder('donation')
      .where('donation.organization_id = :organization_id', { organization_id: id })
      .limit(3)
      .getMany();

    const phones = await this.phonesRepository
      .createQueryBuilder('phone')
      .where('phone.organization_id = :organization_id', { organization_id: id })
      .limit(3)
      .getMany();

    return {
      organization,
      images,
      projects,
      donations,
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

  async findByUser(user_id: string): Promise<Organization> {
    const organization = await this.organizationsRepository.createQueryBuilder('organization')
      .leftJoinAndSelect('organization.organizationType', 'organizationType')
      .leftJoinAndSelect('organization.users', 'users')
      .leftJoinAndSelect('organization.address', 'address')
      .leftJoinAndSelect('address.city', 'cities')
      .leftJoinAndSelect('cities.state', 'state')
      .where('users.id = :id', { id: user_id })
      .getOne();

    return organization;
  }

  async listOrganizationsByOrganizationType(organization_type_id: string): Promise<Organization[]> {
    const organizations = await this.organizationsRepository.find({ organization_type_id });

    return organizations;
  }

  async filter({
    name,
    city_id,
    state_id,
    organization_type_id,
    status,
  }): Promise<Organization[]> {
    const organizationsQuery = await this.organizationsRepository
      .createQueryBuilder('organization')
      .leftJoinAndSelect('organization.address', 'addresses')
      .leftJoinAndSelect('addresses.city', 'cities')
      .leftJoinAndSelect('cities.state', 'states')
      .where('1 = 1');

    if (name) {
      organizationsQuery.andWhere('organization.name ilike :name', { name: `%${name}%` });
    }

    if (status) {
      organizationsQuery.andWhere('organization.status = :status', { status });
    }

    if (city_id) {
      organizationsQuery.andWhere('cities.id = :city_id', { city_id });
    }

    if (state_id) {
      organizationsQuery.andWhere('states.id = :state_id', { state_id });
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
