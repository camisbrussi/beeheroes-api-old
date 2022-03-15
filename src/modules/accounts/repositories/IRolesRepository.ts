import { IRoleDTO } from '../dtos/IRoleDTO';
import { Role } from '../infra/typeorm/entities/Role';

interface IRolesRepository {
  create(data: IRoleDTO): Promise<Role>;
  findByName(name: string): Promise<Role>;
  findById(id: string): Promise<Role>;
  findByIds(ids: string[]): Promise<Role[]>
  list(): Promise<Role[]>;
  update({ id, name, description }: IRoleDTO): Promise<Role>
  delete(id: string): Promise<void>;
}

export { IRolesRepository };
