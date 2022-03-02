interface IVolunteerDTO {
  id?:string,
  description?: string,
  profession?: string,
  cpf?: string,
  avatar?: string,
  occupation_area_id?: string;
  user_id?: string
}

export { IVolunteerDTO };
