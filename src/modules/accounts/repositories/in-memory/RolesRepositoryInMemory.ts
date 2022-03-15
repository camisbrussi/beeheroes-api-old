import { IRoleDTO } from '@modules/accounts/dtos/IRoleDTO';
import { Role } from '@modules/accounts/infra/typeorm/entities/Role';

import { IRolesRepository } from '../IRolesRepository';

class RolesRepositoryInMemory implements IRolesRepository {
  roles: Role[] = [];

  async create({
    id,
    name,
    description,
  }: IRoleDTO): Promise<Role> {
    const roles = new Role();

    const role = Object.assign(roles, {
      id,
      name,
      description,
    });

    this.roles.push(roles);

    return role;
  }

  async findByName(name: string): Promise<Role> {
    const role = this.roles.find((role) => role.name === name);
    return role;
  }

  async findById(id: string): Promise<Role> {
    const role = this.roles.find((role) => role.id === id);
    return role;
  }

  async findByIds(ids: string[]): Promise<Role[]> {
    const allRoles = this.roles
      .filter((role) => ids.includes(role.id));

    return allRoles;
  }

  async list(): Promise<Role[]> {
    const all = this.roles;
    return all;
  }

  async update({ id, name, description }: IRoleDTO): Promise<Role> {
    const findIndex = this.roles.findIndex((role) => role.id === id);

    if (description) this.roles[findIndex].description = description;
    if (name) this.roles[findIndex].name = name;

    return this.roles[findIndex];
  }

  async delete(id: string): Promise<void> {
    const role = this.roles.find((ut) => ut.id === id);
    this.roles.splice(this.roles.indexOf(role));
  }
}

export { RolesRepositoryInMemory };
