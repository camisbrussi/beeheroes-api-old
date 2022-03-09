import { inject, injectable } from 'tsyringe';

import { Evaluation } from '@modules/projects/infra/typeorm/entities/Evaluation';
import { IEvaluationsRepository } from '@modules/projects/repositories/IEvaluationRepository';

interface IRequest {
  id: string,
  score?: number,
  description?: string,
}
@injectable()
class UpdateEvaluationUseCase {
  constructor(
    @inject('EvaluationsRepository')
    private evaluationsRepository: IEvaluationsRepository,
  ) {}

  async execute({
    id,
    score,
    description,
  }: IRequest): Promise<Evaluation> {
    const evaluation = await this.evaluationsRepository.update({
      id,
      score,
      description,
    });

    return evaluation;
  }
}

export { UpdateEvaluationUseCase };
