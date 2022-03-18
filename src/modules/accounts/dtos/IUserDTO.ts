import { Role } from '../infra/typeorm/entities/Role';

interface IUserDTO {
  name?: string,
  email?: string,
  password?: string,
  id?:string,
  status?:number,
  avatar?: string,
  roles?: Role[],
  is_volunteer?: boolean;
  address_id?: string;
}

export { IUserDTO };
