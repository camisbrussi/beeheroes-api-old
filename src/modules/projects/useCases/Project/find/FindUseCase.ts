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
      total_subscription: project.total_subscription ? project.total_subscription : 0,
      organization: {
        id: project.organization?.id,
        name: project.organization?.name,
        description: project.organization?.description,
        email: project.organization?.email,
        cnpj: project.organization?.cnpj,
        avatar: project.organization.avatar,
        organization_type: {
          id: project.organization.organizationType?.id,
          name: project.organization.organizationType?.name,
          description: project.organization.organizationType?.description,
        },
        address: {
          id: project.organization.address?.id,
          street: project.organization.address?.street,
          number: project.organization.address?.number,
          complement: project.organization.address?.complement,
          district: project.organization.address?.district,
          cep: project.organization.address?.cep,
          city: {
            id: project.organization.address?.city?.id,
            name: project.organization.address?.city?.name,
            state: {
              id: project.organization.address?.city?.state?.id,
              name: project.organization.address?.city?.state?.name,
              uf: project.organization.address?.city?.state?.uf,
            },
          },
        },
      },
    });
  }
}

export { FindProjectUseCase };
