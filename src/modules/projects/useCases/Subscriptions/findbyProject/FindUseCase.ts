import { inject, injectable } from 'tsyringe';

import { SubscriptionsProjectMap } from '@modules/projects/mapper/SubscriptionsProjectMap';
import { ISubscriptionsRepository } from '@modules/projects/repositories/ISubscriptiosRepository';
import { AppError } from '@shared/errors/AppError';

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
        volunteer: {
          id: subscription.volunteer.id,
          name: subscription.volunteer.user.name,
          avatar_url: subscription.volunteer.user.avatar ? `${process.env.APP_API_URL}/avatar/${subscription.volunteer.user.avatar_url}` : null,
        },
      })));

    return listSubscriptions;
  }
}

export { FindSubscriptionsByProjectUseCase };
