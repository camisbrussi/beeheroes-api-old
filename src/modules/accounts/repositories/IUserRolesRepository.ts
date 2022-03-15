import { User } from '../infra/typeorm/entities/User';

interface IUserRolesRepository {
  create(user_id: string, roles_id: string): Promise<User>;
}

export { IUserRolesRepository };
