import { User } from '@modules/accounts/infra/typeorm/entities/User';

interface IOrganizationDTO {
  id?:string,
  name?: string,
  description?: string,
  cnpj?: string,
  email?: string,
  status?:number,
  organization_type_id?: number;
  address_id?: string;
  avatar?: string;
  users?: User[]
}

export { IOrganizationDTO };
