interface IOrganizationDTO {
  id?:string,
  name?: string,
  description?: string,
  cnpj?: string,
  email?: string,
  status?:number,
  organization_type_id?: string;
}

export { IOrganizationDTO };
