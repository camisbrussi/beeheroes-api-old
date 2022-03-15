import { Role } from '../infra/typeorm/entities/Role';

interface IUserDTO {
  name?: string,
  email?: string,
  password?: string,
  id?:string,
  status?:number,
  avatar?: string,
  roles?: Role[]
}

export { IUserDTO };
