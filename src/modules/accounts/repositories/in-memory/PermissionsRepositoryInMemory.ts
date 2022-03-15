import { IPermissionDTO } from '@modules/accounts/dtos/IPermission';
import { Permission } from '@modules/accounts/infra/typeorm/entities/Permission';

import { IPermissionsRepository } from '../IPermissionsRepository';

class PermissionRepositoryInMemory implements IPermissionsRepository {
  findByIds(ids: string[]): Promise<Permission[]> {
    throw new Error('Method not implemented.');
  }
  roles: Permission[] = [];

  async create({
    id,
    name,
    description,
  }: IPermissionDTO): Promise<Permission> {
    const roles = new Permission();

    const role = Object.assign(roles, {
      id,
      name,
      description,
    });

    this.roles.push(roles);

    return role;
  }

  async findByName(name: string): Promise<Permission> {
    const role = this.roles.find((role) => role.name === name);
    return role;
  }

  async findById(id: string): Promise<Permission> {
    const role = this.roles.find((role) => role.id === id);
    return role;
  }

  async list(): Promise<Permission[]> {
    const all = this.roles;
    return all;
  }

  async update({ id, name, description }: IPermissionDTO): Promise<Permission> {
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

export { PermissionRepositoryInMemory };
