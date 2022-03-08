import { getRepository, Repository } from 'typeorm';

import { ISubscriptionDTO } from '@modules/projects/dtos/ISubscriptionDTO';
import { ISubscriptionsRepository } from '@modules/projects/repositories/ISubscriptiosRepository';

import { Subscription } from '../entities/Subscription';

class SubscriptionsRepository implements ISubscriptionsRepository {
  private subscriptionsRepository: Repository<Subscription>

  constructor() {
    this.subscriptionsRepository = getRepository(Subscription);
  }

  async create({
    registration_date,
    project_id,
    volunteer_id,
  }: ISubscriptionDTO): Promise<Subscription> {
    const subscription = this.subscriptionsRepository.create({
      registration_date,
      project_id,
      volunteer_id,
    });

    await this.subscriptionsRepository.save(subscription);

    return subscription;
  }

  async findByProjectId(project_id: string): Promise<Subscription[]> {
    const subscriptions = await this.subscriptionsRepository.find({ project_id });

    return subscriptions;
  }

  async findByVolunteerId(volunteer_id: string): Promise<Subscription[]> {
    const subscriptions = await this.subscriptionsRepository.find({ volunteer_id });

    return subscriptions;
  }

  async findById(id: string): Promise<Subscription> {
    const subscription = await this.subscriptionsRepository.findOne({ id });

    return subscription;
  }

  async filter({
    registration_date,
    participation_date,
    project_id,
    volunteer_id,
    status,
  }: ISubscriptionDTO): Promise<Subscription[]> {
    const subscriptionsQuery = await this.subscriptionsRepository
      .createQueryBuilder('u')
      .where('1 = 1');
    if (registration_date) {
      subscriptionsQuery.andWhere('registration_date > :registration_date', { registration_date });
    }

    if (participation_date) {
      subscriptionsQuery.andWhere('participation_date < :participation_date', { participation_date });
    }

    if (status) {
      subscriptionsQuery.andWhere('status = :status', { status });
    }

    if (project_id) {
      subscriptionsQuery.andWhere('project_id = :project_id', { project_id });
    }

    if (volunteer_id) {
      subscriptionsQuery.andWhere('volunteer_id = :volunteer_id', { volunteer_id });
    }

    const subscriptions = await subscriptionsQuery.getMany();

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
    const setSubscription: ISubscriptionDTO = { };

    if (registration_date) setSubscription.registration_date = registration_date;
    if (participation_date) setSubscription.participation_date = participation_date;
    if (project_id) setSubscription.project_id = project_id;
    if (volunteer_id) setSubscription.volunteer_id = volunteer_id;
    if (status) setSubscription.status = status;

    const subscriptionTypeEdited = await this.subscriptionsRepository
      .createQueryBuilder()
      .update()
      .set(setSubscription)
      .where('id = :id')
      .setParameters({ id })
      .execute();

    return subscriptionTypeEdited.raw;
  }
}

export { SubscriptionsRepository };
