import { IPermissionDTO } from '@modules/accounts/dtos/IPermission';
import { Permission } from '@modules/accounts/infra/typeorm/entities/Permission';

import { IPermissionsRepository } from '../IPermissionsRepository';

class PermissionsRepositoryInMemory implements IPermissionsRepository {
  permission: Permission[] = [];

  async create({
    id,
    name,
    description,
  }: IPermissionDTO): Promise<Permission> {
    const permission = new Permission();

    const role = Object.assign(permission, {
      id,
      name,
      description,
    });

    this.permission.push(permission);

    return role;
  }

  async findByName(name: string): Promise<Permission> {
    const role = this.permission.find((role) => role.name === name);
    return role;
  }

  async findById(id: string): Promise<Permission> {
    const role = this.permission.find((role) => role.id === id);
    return role;
  }

  async findByIds(ids: string[]): Promise<Permission[]> {
    const allPermissions = this.permission
      .filter((permission) => ids.includes(permission.id));

    return allPermissions;
  }

  async list(): Promise<Permission[]> {
    const all = this.permission;
    return all;
  }

  async update({ id, name, description }: IPermissionDTO): Promise<Permission> {
    const findIndex = this.permission.findIndex((role) => role.id === id);

    if (description) this.permission[findIndex].description = description;
    if (name) this.permission[findIndex].name = name;

    return this.permission[findIndex];
  }

  async delete(id: string): Promise<void> {
    const role = this.permission.find((ut) => ut.id === id);
    this.permission.splice(this.permission.indexOf(role));
  }
}

export { PermissionsRepositoryInMemory };
