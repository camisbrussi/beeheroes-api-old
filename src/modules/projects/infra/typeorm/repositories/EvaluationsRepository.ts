import { getRepository, Repository } from 'typeorm';

import { IEvaluationDTO } from '@modules/projects/dtos/IEvaluationDTO';
import { IEvaluationsRepository } from '@modules/projects/repositories/IEvaluationRepository';

import { Evaluation } from '../entities/Evaluation';

class EvaluationsRepository implements IEvaluationsRepository {
  private evaluationsRepository: Repository<Evaluation>

  constructor() {
    this.evaluationsRepository = getRepository(Evaluation);
  }

  async create({
    score,
    description,
    subscription_id,
  }: IEvaluationDTO): Promise<Evaluation> {
    const evaluation = this.evaluationsRepository.create({
      score,
      description,
      subscription_id,
    });

    await this.evaluationsRepository.save(evaluation);

    return evaluation;
  }

  async findBySubscriptionId(subscription_id: string): Promise<Evaluation[]> {
    const evaluations = await this.evaluationsRepository.find({ subscription_id });

    return evaluations;
  }

  async findById(id: string): Promise<Evaluation> {
    const evaluation = await this.evaluationsRepository.findOne({ id });

    return evaluation;
  }

  async update({
    id,
    score,
    description,
  }: IEvaluationDTO): Promise<Evaluation> {
    const setEvaluation: IEvaluationDTO = { };

    if (score) setEvaluation.score = score;
    if (description) setEvaluation.description = description;

    const evaluation = await this.evaluationsRepository
      .createQueryBuilder()
      .update()
      .set(setEvaluation)
      .where('id = :id')
      .setParameters({ id })
      .execute();

    return evaluation.raw;
  }
}

export { EvaluationsRepository };
