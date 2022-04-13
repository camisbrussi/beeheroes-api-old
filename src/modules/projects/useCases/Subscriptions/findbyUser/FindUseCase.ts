import { inject, injectable } from 'tsyringe';

import { ProjectListMap } from '@modules/projects/mapper/ProjectListMap';
import { ISubscriptionsRepository } from '@modules/projects/repositories/ISubscriptiosRepository';

@injectable()
class FindSubscriptionsByUserUseCase {
  constructor(
    @inject('SubscriptionsRepository')
    private subscriptionsRepository: ISubscriptionsRepository,
  ) { }

  async execute(id: string): Promise<ProjectListMap[]> {
    const subscriptions = await this.subscriptionsRepository.findByUserId(id);

    const listSubscriptions = subscriptions
      .map((subscription) => (ProjectListMap.toDTO({
        id: subscription.project.id,
        name: subscription.project.name,
        start: subscription.project.start,
        end: subscription.project.end,
        status: subscription.project.status,
        status_subscription: subscription.status,
      })));

    return listSubscriptions;
  }
}

export { FindSubscriptionsByUserUseCase };
