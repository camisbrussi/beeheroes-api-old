import { ISubscriptionDTO } from '../dtos/ISubscriptionDTO';
import { Subscription } from '../infra/typeorm/entities/Subscription';

interface ISubscriptionsRepository{
  create({
    registration_date,
    project_id,
    user_id,
  }: ISubscriptionDTO): Promise<Subscription>;
  findByProjectId(project_id: string): Promise<Subscription[]>;
  findByUserId(user_id: string): Promise<Subscription[]>;
  findById(id: string): Promise<Subscription>;
  countByProject(id: string): Promise<number>;
  filter({
    registration_date,
    participation_date,
    project_id,
    user_id,
    status,
  }: ISubscriptionDTO): Promise<Subscription[]>;
  update({
    id,
    registration_date,
    participation_date,
    project_id,
    user_id,
    status,
  }: ISubscriptionDTO): Promise<Subscription>;
}

export { ISubscriptionsRepository };
