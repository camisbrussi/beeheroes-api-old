import { inject, injectable } from 'tsyringe';

import { IProjectDTO } from '@modules/projects/dtos/IProjectDTO';
import { IProjectsRepository } from '@modules/projects/repositories/IProjectsRepository';
import { ItemListMap } from '@utils/mapper/ItemListMap';

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
    organization_type_id,
    city_id,
    state_id,
    organization_id,
  }): Promise<ItemListMap[]> {
    const projects = await this.projectsRepository.filter({
      name,
      start,
      end,
      status,
      organization_type_id,
      city_id,
      state_id,
      organization_id,
    });

    const listProject = projects
      .map((project) => (ItemListMap.toDTO({
        id: project.id,
        name: project.name,
        subtitle: project.organization?.name,
        avatar: project.organization?.avatar,
        city: project.organization?.address?.city?.name,
        uf: project.organization?.address?.city?.state.uf,
      })));

    return listProject;
  }
}

export { FilterProjectUseCase };
