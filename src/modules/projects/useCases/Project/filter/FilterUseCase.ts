import { inject, injectable } from 'tsyringe';

import { ProjectListMap } from '@modules/projects/mapper/ProjectListMap';
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

    return projects;
  }
}

export { FilterProjectUseCase };
