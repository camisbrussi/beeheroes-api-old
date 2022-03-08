interface ISubscriptionDTO {
  id?:string,
  registration_date?: Date,
  participation_date?: Date,
  status?:number,
  project_id?: string;
  volunteer_id?:string;
}

export { ISubscriptionDTO };
