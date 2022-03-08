import { inject, injectable } from 'tsyringe';

import { Subscription } from '@modules/projects/infra/typeorm/entities/Subscription';
import { ISubscriptionsRepository } from '@modules/projects/repositories/ISubscriptiosRepository';

interface IRequest {
  id: string,
  registration_date?: Date;
  participation_date?: Date;
  status?: number;
}
@injectable()
class UpdateSubscriptionUseCase {
  constructor(
    @inject('SubscriptionsRepository')
    private projectsRepository: ISubscriptionsRepository,
  ) {}

  async execute({
    id,
    registration_date,
    participation_date,
    status,
  }: IRequest): Promise<Subscription> {
    const project = await this.projectsRepository.update({
      id,
      registration_date,
      participation_date,
      status,
    });

    return project;
  }
}

export { UpdateSubscriptionUseCase };
