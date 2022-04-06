import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { Subscription } from '@modules/projects/infra/typeorm/entities/Subscription';
import { IProjectsRepository } from '@modules/projects/repositories/IProjectsRepository';
import { ISubscriptionsRepository } from '@modules/projects/repositories/ISubscriptiosRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  project_id: string;
  user_id: string;
}

@injectable()
class CreateSubscriptionUseCase {
  constructor(
    @inject('SubscriptionsRepository')
    private subscriptionsRepository: ISubscriptionsRepository,
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    project_id,
    user_id,
  }: IRequest): Promise<Subscription> {
    const projectExists = await
    this.projectsRepository.findById(project_id);

    if (!projectExists) {
      throw new AppError('Project does not exists!');
    }

    const userExists = await
    this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('User does not exists!');
    }

    const subscriptionProjectExists = await this
      .subscriptionsRepository.findByProjectId(project_id);
    const subscriptionUserExists = await this
      .subscriptionsRepository.findByUserId(user_id);

    if (subscriptionProjectExists.length > 0 && subscriptionUserExists.length > 0) {
      throw new AppError('Subscription already exists!');
    }

    const subscriptions = await this.subscriptionsRepository.create({
      registration_date: new Date(),
      project_id,
      user_id,
    });

    return subscriptions;
  }
}

export { CreateSubscriptionUseCase };
