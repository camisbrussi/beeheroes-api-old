import { inject, injectable } from 'tsyringe';

import { Subscription } from '@modules/projects/infra/typeorm/entities/Subscription';
import { IProjectsRepository } from '@modules/projects/repositories/IProjectsRepository';
import { ISubscriptionsRepository } from '@modules/projects/repositories/ISubscriptiosRepository';
import { IVolunteersRepository } from '@modules/volunteers/repositories/IVolunteersRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  registration_date: Date;
  project_id: string;
  volunteer_id: string;
}

@injectable()
class CreateSubscriptionUseCase {
  constructor(
    @inject('SubscriptionsRepository')
    private subscriptionsRepository: ISubscriptionsRepository,
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository,
  ) {}

  async execute({
    registration_date,
    project_id,
    volunteer_id,
  }: IRequest): Promise<Subscription> {
    const projectExists = await
    this.projectsRepository.findById(project_id);

    if (!projectExists) {
      throw new AppError('Project does not exists!');
    }

    const volunteerExists = await
    this.volunteersRepository.findById(volunteer_id);

    if (!volunteerExists) {
      throw new AppError('Volunteer does not exists!');
    }

    const subscriptionProjectExists = await this
      .subscriptionsRepository.findByProjectId(project_id);
    const subscriptionVolunteerExists = await this
      .subscriptionsRepository.findByVolunteerId(volunteer_id);

    if (subscriptionProjectExists.length > 0 && subscriptionVolunteerExists.length > 0) {
      throw new AppError('Subscription already exists!');
    }

    const subscriptions = await this.subscriptionsRepository.create({
      registration_date,
      project_id,
      volunteer_id,
    });

    return subscriptions;
  }
}

export { CreateSubscriptionUseCase };
