interface IDonationDTO {
  id?:string,
  name?: string,
  description?: string,
  total_value?: number,
  total_collected?: number,
  status?:number,
  organization_id?: string;
}

export { IDonationDTO };
