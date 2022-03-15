import { IPermissionDTO } from '../dtos/IPermission';
import { Permission } from '../infra/typeorm/entities/Permission';

interface IPermissionsRepository {
  create({ name, description }: IPermissionDTO): Promise<Permission>;
  findByName(name: string): Promise<Permission>;
  findById(id: string): Promise<Permission>;
  findByIds(ids: string[]): Promise<Permission[]>
  list(): Promise<Permission[]>;
  update({ id, name, description }: IPermissionDTO): Promise<Permission>
  delete(id: string): Promise<void>;
}

export { IPermissionsRepository };
