import { inject, injectable } from 'tsyringe';

import { Evaluation } from '@modules/projects/infra/typeorm/entities/Evaluation';
import { IEvaluationsRepository } from '@modules/projects/repositories/IEvaluationRepository';
import { ISubscriptionsRepository } from '@modules/projects/repositories/ISubscriptiosRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  score: number,
  description?: string,
  subscription_id: string,
}

@injectable()
class CreateEvaluationUseCase {
  constructor(
    @inject('EvaluationsRepository')
    private evaluationsRepository: IEvaluationsRepository,
    @inject('SubscriptionsRepository')
    private subscriptionsRepository: ISubscriptionsRepository,
  ) {}

  async execute({
    score,
    description,
    subscription_id,
  }: IRequest): Promise<Evaluation> {
    const subscriptionExists = await
    this.subscriptionsRepository.findById(subscription_id);

    if (!subscriptionExists) {
      throw new AppError('Subscription does not exists!');
    }

    const evaluation = await this.evaluationsRepository.create({
      score,
      description,
      subscription_id,
    });

    return evaluation;
  }
}

export { CreateEvaluationUseCase };
