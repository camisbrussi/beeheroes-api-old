import { inject, injectable } from 'tsyringe';

import { Evaluation } from '@modules/projects/infra/typeorm/entities/Evaluation';
import { IEvaluationsRepository } from '@modules/projects/repositories/IEvaluationRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class FindEvaluationUseCase {
  constructor(
    @inject('EvaluationsRepository')
    private evaluationsRepository: IEvaluationsRepository,
  ) { }

  async execute(id: string): Promise<Evaluation> {
    const evaluation = await this.evaluationsRepository.findById(id);

    if (!evaluation) {
      throw new AppError('Evaluation does not exist');
    }

    return evaluation;
  }
}

export { FindEvaluationUseCase };
