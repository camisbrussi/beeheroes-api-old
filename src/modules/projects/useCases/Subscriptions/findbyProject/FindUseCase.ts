import { inject, injectable } from 'tsyringe';

import { Subscription } from '@modules/projects/infra/typeorm/entities/Subscription';
import { ISubscriptionsRepository } from '@modules/projects/repositories/ISubscriptiosRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class FindSubscriptionsByProjectUseCase {
  constructor(
    @inject('SubscriptionsRepository')
    private subscriptionsRepository: ISubscriptionsRepository,
  ) { }

  async execute(id: string): Promise<Subscription[]> {
    const subscriptions = await this.subscriptionsRepository.findByProjectId(id);

    if (!subscriptions.length) {
      throw new AppError('Subscription does not exist');
    }

    return subscriptions;
  }
}

export { FindSubscriptionsByProjectUseCase };
