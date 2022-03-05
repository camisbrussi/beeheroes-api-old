import { inject, injectable } from 'tsyringe';

import { IProjectDTO } from '@modules/projects/dtos/IProjectDTO';
import { Project } from '@modules/projects/infra/typeorm/entities/Project';
import { IProjectsRepository } from '@modules/projects/repositories/IProjectsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class FilterProjectUseCase {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) { }

  async execute({
    name,
    start,
    end,
    status,
    organization_id,
  }: IProjectDTO): Promise<Project[]> {
    const project = await this.projectsRepository.filter({
      name,
      start,
      end,
      status,
      organization_id,
    });

    if (!project) {
      throw new AppError('Project does not exist');
    }

    return project;
  }
}

export { FilterProjectUseCase };
