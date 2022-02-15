interface ICreateUserDTO {
  name: string,
  email: string,
  password: string,
  id?:string,
  status?:string,
  user_type_id: string;
}

export { ICreateUserDTO }