import { inject, injectable } from 'tsyringe';

import { ISubscriptionDTO } from '@modules/projects/dtos/ISubscriptionDTO';
import { Subscription } from '@modules/projects/infra/typeorm/entities/Subscription';
import { ISubscriptionsRepository } from '@modules/projects/repositories/ISubscriptiosRepository';

@injectable()
class FilterSubscriptionUseCase {
  constructor(
    @inject('SubscriptionsRepository')
    private subscriptionsRepository: ISubscriptionsRepository,
  ) { }

  async execute({
    registration_date,
    participation_date,
    project_id,
    volunteer_id,
    status,
  }: ISubscriptionDTO): Promise<Subscription[]> {
    const subscription = await this.subscriptionsRepository.filter({
      registration_date,
      participation_date,
      project_id,
      volunteer_id,
      status,
    });

    return subscription;
  }
}

export { FilterSubscriptionUseCase };
