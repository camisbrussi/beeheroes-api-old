import { ISubscriptionDTO } from '@modules/projects/dtos/ISubscriptionDTO';
import { Subscription } from '@modules/projects/infra/typeorm/entities/Subscription';

import { ISubscriptionsRepository } from '../ISubscriptiosRepository';

class SubscriptionsRepositoryInMemory implements ISubscriptionsRepository {
  subscriptions: Subscription[] = [];

  async create({
    registration_date,
    project_id,
    volunteer_id,
  }: ISubscriptionDTO): Promise<Subscription> {
    const subscription = new Subscription();

    Object.assign(subscription, {
      registration_date,
      project_id,
      volunteer_id,
    });

    this.subscriptions.push(subscription);

    return (subscription);
  }

  async findByProjectId(project_id: string): Promise<Subscription[]> {
    const subscriptions = this.subscriptions
      .filter((subscription) => project_id.includes(subscription.project_id));

    return subscriptions;
  }

  async findByVolunteerId(volunteer_id: string): Promise<Subscription[]> {
    const subscriptions = this.subscriptions
      .filter((subscription) => volunteer_id.includes(subscription.volunteer_id));

    return subscriptions;
  }

  async findById(id: string): Promise<Subscription> {
    const subscription = this.subscriptions.find((subscription) => subscription.id === id);

    return subscription;
  }

  async filter({
    registration_date,
    participation_date,
    project_id,
    volunteer_id,
    status,
  }: ISubscriptionDTO): Promise<Subscription[]> {
    const subscriptions = this.subscriptions.filter((subscription) => {
      if ((registration_date && subscription.registration_date > registration_date)
        || (status && subscription.status === status)
        || (participation_date && subscription.participation_date < participation_date)
        || (project_id && subscription.project_id === project_id)
        || (volunteer_id && subscription.volunteer_id === volunteer_id)
      ) {
        return subscription;
      }
      return null;
    });

    return subscriptions;
  }

  async update({
    id,
    registration_date,
    participation_date,
    project_id,
    volunteer_id,
    status,
  }: ISubscriptionDTO): Promise<Subscription> {
    const findIndex = this.subscriptions.findIndex((subscription) => subscription.id === id);

    if (registration_date) this.subscriptions[findIndex].registration_date = registration_date;
    if (participation_date) this.subscriptions[findIndex].participation_date = participation_date;
    if (project_id) this.subscriptions[findIndex].project_id = project_id;
    if (volunteer_id) this.subscriptions[findIndex].volunteer_id = volunteer_id;
    if (status) this.subscriptions[findIndex].status = status;

    return this.subscriptions[findIndex];
  }

  async list(): Promise<Subscription[]> {
    const all = this.subscriptions;
    return all;
  }
}

export { SubscriptionsRepositoryInMemory };
