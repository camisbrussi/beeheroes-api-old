import { instanceToInstance } from 'class-transformer';

import { ISubscriptionDTO } from '../dtos/ISubscriptionDTO';

type SubscriptionsProject = {
  id: string;
  volunteer: {
    id: string;
    name: string;
    avatar_url: string;
  }
}

class SubscriptionsProjectMap {
  static toDTO({
    id,
    volunteer,
  }: SubscriptionsProject): ISubscriptionDTO {
    const subscriptions = instanceToInstance({
      id,
      volunteer,
    });
    return subscriptions;
  }
}

export { SubscriptionsProjectMap };
