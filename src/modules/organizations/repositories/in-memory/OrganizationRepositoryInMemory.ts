import { IOrganizationDTO } from '@modules/organizations/dtos/IOrganizationDTO';
import { Organization } from '@modules/organizations/infra/typeorm/entities/Organization';

import { IOrganizationsRepository } from '../IOrganizationRepository';

class OrganizationsRepositoryInMemory implements IOrganizationsRepository {
  organizations: Organization[] = [];

  async create({
    name,
    email,
    description,
    cnpj,
    organization_type_id,
  }: IOrganizationDTO): Promise<Organization> {
    const organization = new Organization();

    Object.assign(organization, {
      name,
      email,
      description,
      cnpj,
      organization_type_id,
    });

    this.organizations.push(organization);

    return (organization);
  }

  async findByEmail(email: string): Promise<Organization> {
    const organization = this.organizations.find((organization) => organization.email === email);
    return organization;
  }

  async findById(id: string): Promise<Organization> {
    const organization = this.organizations.find((organization) => organization.id === id);
    return organization;
  }

  async filter({
    name,
    email,
    status,
    organization_type_id,
    cnpj,
  }: IOrganizationDTO): Promise<Organization[]> {
    const organizations = this.organizations.filter((organization) => {
      if ((email && email.includes(email))
        || (name && organization.name.includes(name))
        || (status && organization.status === status)
        || (cnpj && organization.cnpj === cnpj)
        || (organization_type_id && organization.organization_type_id === organization_type_id)
      ) {
        return organization;
      }
      return null;
    });

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
    const findIndex = this.organizations.findIndex((organization) => organization.id === id);

    if (name) this.organizations[findIndex].name = name;
    if (email) this.organizations[findIndex].email = email;
    if (description) this.organizations[findIndex].description = description;
    if (cnpj) this.organizations[findIndex].cnpj = cnpj;
    if (status) this.organizations[findIndex].status = status;
    if (organization_type_id) {
      this.organizations[findIndex]
        .organization_type_id = organization_type_id;
    }

    return this.organizations[findIndex];
  }

  async list(): Promise<Organization[]> {
    const all = this.organizations;
    return all;
  }

  async listOrganizationsByOrganizationType(organization_type_id: string): Promise<Organization[]> {
    const organizations = this.organizations.filter((organization) => {
      if (organization.organization_type_id === organization_type_id) {
        return organization;
      }
      return null;
    });
    return organizations;
  }
}

export { OrganizationsRepositoryInMemory };
