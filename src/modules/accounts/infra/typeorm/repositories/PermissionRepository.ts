import { getRepository, Repository } from 'typeorm';

import { IPermissionDTO } from '@modules/accounts/dtos/IPermission';
import { IPermissionsRepository } from '@modules/accounts/repositories/IPermissionsRepository';

import { Permission } from '../entities/Permission';

class PermissionsRepository implements IPermissionsRepository {
  private repository: Repository<Permission>

  constructor() {
    this.repository = getRepository(Permission);
  }

  async create({ id, name, description }: IPermissionDTO): Promise<Permission> {
    const permission = this.repository.create({
      id,
      name,
      description,
    });
    await this.repository.save(permission);

    return permission;
  }

  async list(): Promise<Permission[]> {
    const permission = await this.repository.find();
    return permission;
  }

  async findByName(name: string): Promise<Permission> {
    const permission = await this.repository.findOne({ name });
    return permission;
  }

  async findById(id: string): Promise<Permission> {
    const permission = await this.repository.findOne({ id });
    return permission;
  }

  async findByIds(ids: string[]): Promise<Permission[]> {
    const permissions = await this.repository.findByIds(ids);
    return permissions;
  }

  async update({ id, name, description }: IPermissionDTO): Promise<Permission> {
    const setPermission: IPermissionDTO = {};

    if (name) setPermission.name = name;
    if (description) setPermission.description = description;

    const permissionEdited = await this.repository
      .createQueryBuilder()
      .update()
      .set(setPermission)
      .where('id = :id')
      .setParameters({ id })
      .execute();

    return permissionEdited.raw;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { PermissionsRepository };
