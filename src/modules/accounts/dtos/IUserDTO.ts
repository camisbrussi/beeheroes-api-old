interface IUserDTO {
  name?: string,
  email?: string,
  password?: string,
  id?:string,
  status?:number,
  user_type_id?: number;
  address_id?: string;
}

export { IUserDTO };