import { inject, injectable } from 'tsyringe';

import { SubscriptionsProjectMap } from '@modules/projects/mapper/SubscriptionsProjectMap';
import { ISubscriptionsRepository } from '@modules/projects/repositories/ISubscriptiosRepository';

@injectable()
class FindSubscriptionsByProjectUseCase {
  constructor(
    @inject('SubscriptionsRepository')
    private subscriptionsRepository: ISubscriptionsRepository,
  ) { }

  async execute(id: string): Promise<SubscriptionsProjectMap[]> {
    const subscriptions = await this.subscriptionsRepository.findByProjectId(id);

    const listSubscriptions = subscriptions
      .map((subscription) => (SubscriptionsProjectMap.toDTO({
        id: subscription.id,
        status: subscription.status,
        volunteer: {
          id: subscription.user.id,
          name: subscription.user.name,
          avatar: subscription.user.avatar,
        },
      })));

    return listSubscriptions;
  }
}

export { FindSubscriptionsByProjectUseCase };
