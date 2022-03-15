import { getRepository, Repository } from 'typeorm';

import { IRoleDTO } from '@modules/accounts/dtos/IRoleDTO';
import { IRolesRepository } from '@modules/accounts/repositories/IRolesRepository';

import { Role } from '../entities/Role';

class RolesRepository implements IRolesRepository {
  private repository: Repository<Role>

  constructor() {
    this.repository = getRepository(Role);
  }

  async create({
    id, name, description, permissions,
  }: IRoleDTO): Promise<Role> {
    const role = this.repository.create({
      id,
      name,
      description,
      permissions,
    });
    await this.repository.save(role);

    return role;
  }

  async list(): Promise<Role[]> {
    const role = await this.repository.find();
    return role;
  }

  async findByName(name: string): Promise<Role> {
    const role = await this.repository.findOne({ name });
    return role;
  }

  async findById(id: string): Promise<Role> {
    const role = await this.repository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.permissions', 'permissions')
      .where('role.id = :id', { id })
      .getOne();

    return role;
  }

  async findByIds(ids: string[]): Promise<Role[]> {
    const roles = await this.repository.findByIds(ids);
    return roles;
  }

  async update({
    id, name, description,
  }: IRoleDTO): Promise<Role> {
    const setRole: IRoleDTO = {};

    if (name) setRole.name = name;
    if (description) setRole.description = description;

    const roleEdited = await this.repository
      .createQueryBuilder()
      .update()
      .set(setRole)
      .where('id = :id')
      .setParameters({ id })
      .execute();

    return roleEdited.raw;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { RolesRepository };
