import { ISubscriptionDTO } from '../dtos/ISubscriptionDTO';
import { Subscription } from '../infra/typeorm/entities/Subscription';

interface ISubscriptionsRepository{
  create({
    registration_date,
    project_id,
    volunteer_id,
  }: ISubscriptionDTO): Promise<Subscription>;
  findByProjectId(project_id: string): Promise<Subscription[]>;
  findByVolunteerId(volunteer_id: string): Promise<Subscription[]>;
  findById(id: string): Promise<Subscription>;
  filter({
    registration_date,
    participation_date,
    project_id,
    volunteer_id,
    status,
  }: ISubscriptionDTO): Promise<Subscription[]>;
  update({
    id,
    registration_date,
    participation_date,
    project_id,
    volunteer_id,
    status,
  }: ISubscriptionDTO): Promise<Subscription>;
}

export { ISubscriptionsRepository };
