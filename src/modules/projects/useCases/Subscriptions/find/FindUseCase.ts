import { inject, injectable } from 'tsyringe';

import { Subscription } from '@modules/projects/infra/typeorm/entities/Subscription';
import { ISubscriptionsRepository } from '@modules/projects/repositories/ISubscriptiosRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class FindSubscriptionUseCase {
  constructor(
    @inject('SubscriptionsRepository')
    private projectsRepository: ISubscriptionsRepository,
  ) { }

  async execute(id: string): Promise<Subscription> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError('Subscription does not exist');
    }

    return project;
  }
}

export { FindSubscriptionUseCase };
