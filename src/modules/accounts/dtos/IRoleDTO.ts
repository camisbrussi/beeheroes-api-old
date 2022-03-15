import { Permission } from '../infra/typeorm/entities/Permission';

interface IRoleDTO {
  id?: string;
  name?: string;
  description?: string;
  permissions?: Permission[]
}

export { IRoleDTO };
