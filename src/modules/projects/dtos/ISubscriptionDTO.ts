interface ISubscriptionDTO {
  id?:string,
  registration_date?: Date,
  participation_date?: Date,
  status?:number,
  project_id?: string;
  user_id?:string;
}

export { ISubscriptionDTO };
