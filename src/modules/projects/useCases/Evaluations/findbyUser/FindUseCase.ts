import { inject, injectable } from 'tsyringe';

import { EvaluationListMap } from '@modules/projects/mapper/EvaluationListMap';
import { ProjectListMap } from '@modules/projects/mapper/ProjectListMap';
import { IEvaluationsRepository } from '@modules/projects/repositories/IEvaluationRepository';

@injectable()
class FindEvaluationsByUserUseCase {
  constructor(
    @inject('EvaluationsRepository')
    private evaluationsRepository: IEvaluationsRepository,
  ) { }

  async execute(id: string): Promise<ProjectListMap[]> {
    const evaluations = await this.evaluationsRepository.findByUserId(id);

    const listEvaluations = evaluations
      .map((evaluation) => (EvaluationListMap.toDTO({
        id: evaluation.id,
        score: evaluation.score,
        description: evaluation.description,
        organization: {
          name: evaluation.subscription.project.organization.name,
          avatar: evaluation.subscription.project.organization.avatar,
        },
      })));

    return listEvaluations;
  }
}

export { FindEvaluationsByUserUseCase };
