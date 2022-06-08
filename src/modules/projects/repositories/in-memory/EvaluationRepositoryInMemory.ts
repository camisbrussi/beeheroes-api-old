import { IEvaluationDTO } from '@modules/projects/dtos/IEvaluationDTO';
import { Evaluation } from '@modules/projects/infra/typeorm/entities/Evaluation';

import { IEvaluationsRepository } from '../IEvaluationRepository';

class EvaluationsRepositoryInMemory implements IEvaluationsRepository {
  evaluations: Evaluation[] = [];

  async create({
    score,
    description,
    subscription_id,
  }: IEvaluationDTO): Promise<Evaluation> {
    const evaluation = new Evaluation();

    Object.assign(evaluation, {
      score,
      description,
      subscription_id,
    });

    this.evaluations.push(evaluation);

    return (evaluation);
  }

  async findByUserId(user_id: string): Promise<Evaluation[]> {
    const evaluations = this.evaluations
      .filter((evaluation) => evaluation.subscription.user_id === user_id);

    return evaluations;
  }

  async findBySubscriptionId(subscription_id: string): Promise<Evaluation[]> {
    const evaluations = this.evaluations
      .filter((evaluation) => subscription_id.includes(evaluation.subscription_id));

    return evaluations;
  }

  async findById(id: string): Promise<Evaluation> {
    const evaluation = this.evaluations.find((evaluation) => evaluation.id === id);

    return evaluation;
  }

  async update({
    id,
    score,
    description,
    subscription_id,
  }: IEvaluationDTO): Promise<Evaluation> {
    const findIndex = this.evaluations.findIndex((evaluation) => evaluation.id === id);

    if (score !== null) this.evaluations[findIndex].score = score;
    if (subscription_id) this.evaluations[findIndex].subscription_id = subscription_id;
    if (description) this.evaluations[findIndex].description = description;

    return this.evaluations[findIndex];
  }
}

export { EvaluationsRepositoryInMemory };
