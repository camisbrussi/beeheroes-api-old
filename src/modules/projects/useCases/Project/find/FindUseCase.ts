import { inject, injectable } from 'tsyringe';

import { ProjectMap } from '@modules/projects/mapper/ProjectMap';
import { IProjectsRepository } from '@modules/projects/repositories/IProjectsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class FindProjectUseCase {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) { }

  async execute(id: string): Promise<ProjectMap> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError('Project does not exist');
    }

    return ProjectMap.toDTO({
      id: project.id,
      name: project.name,
      description: project.description,
      start: project.start,
      end: project.end,
      status: project.status,
      vacancies: project.vacancies,
      total_subscription: project.total_subscription ? project.total_subscription : 0,
      organization_id: project.organization_id,
    });
  }
}

export { FindProjectUseCase };
