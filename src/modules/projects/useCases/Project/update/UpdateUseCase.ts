import { inject, injectable } from 'tsyringe';

import { Project } from '@modules/projects/infra/typeorm/entities/Project';
import { IProjectsRepository } from '@modules/projects/repositories/IProjectsRepository';

interface IRequest {
  id: string,
  name?: string,
  description?: string;
  start?: Date;
  end?: Date;
  vacancies?: number;
  status?: number;
}
@injectable()
class UpdateProjectUseCase {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  async execute({
    id,
    name,
    description,
    start,
    end,
    vacancies,
    status,
  }: IRequest): Promise<Project> {
    const project = await this.projectsRepository.update({
      id,
      name,
      description,
      start,
      end,
      vacancies,
      status,
    });

    return project;
  }
}

export { UpdateProjectUseCase };
