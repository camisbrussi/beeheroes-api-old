import { inject, injectable } from 'tsyringe';

import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { Project } from '@modules/projects/infra/typeorm/entities/Project';
import { IProjectsRepository } from '@modules/projects/repositories/IProjectsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description?: string;
  start: Date;
  end: Date;
  vacancies?: number;
  organization_id: string;
}

@injectable()
class CreateProjectUseCase {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
    @inject('OrganizationsRepository')
    private organizationRepository: IOrganizationsRepository,
  ) {}

  async execute({
    name,
    description,
    start,
    end,
    vacancies,
    organization_id,
  }: IRequest): Promise<Project> {
    const organizationExists = await
    this.organizationRepository.findById(organization_id);

    if (!organizationExists.organization) {
      throw new AppError('Organization does not exists!');
    }

    const project = await this.projectsRepository.create({
      name,
      description,
      start,
      end,
      vacancies,
      organization_id,
    });

    return project;
  }
}

export { CreateProjectUseCase };
