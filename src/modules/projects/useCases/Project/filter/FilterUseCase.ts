import { inject, injectable } from 'tsyringe';

import { IProjectsRepository } from '@modules/projects/repositories/IProjectsRepository';
import { ItemListMap } from '@utils/mapper/ItemListMap';

interface IRequest {
  name?: string;
  start?: Date;
  end?: Date;
  status?: number;
  state_id?: number,
  city_id?: number;
  organization_id?: string;
  organization_type_id?: number;
}

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
  }: IRequest): Promise<ItemListMap[]> {
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
