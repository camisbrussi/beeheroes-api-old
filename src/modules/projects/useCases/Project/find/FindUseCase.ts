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
      description: project.name,
      start: project.start,
      end: project.end,
      status: project.status,
      vacancies: project.vacancies,
      total_subscription: project.total_subscription,
      organization: {
        id: project.organization?.id,
        name: project.organization?.name,
        description: project.organization?.description,
        email: project.organization?.email,
        cnpj: project.organization?.cnpj,
        avatar_url: project.organization.avatar ? `${process.env.APP_API_URL}/avatar/${project.organization.avatar}` : null,
        organization_type: {
          name: project.organization?.organizationType?.name,
        },
      },
    });
  }
}

export { FindProjectUseCase };
