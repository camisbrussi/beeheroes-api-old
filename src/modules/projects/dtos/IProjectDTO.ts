interface IProjectDTO {
  id?:string,
  name?: string,
  description?: string,
  start?: Date,
  end?: Date,
  vacancies?: number,
  status?:number,
  organization_id?: string;
  total_subscription?: number;
}

export { IProjectDTO };
