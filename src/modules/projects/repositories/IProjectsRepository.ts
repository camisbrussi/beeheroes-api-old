import { IProjectDTO } from '../dtos/IProjectDTO';
import { Project } from '../infra/typeorm/entities/Project';

interface IProjectsRepository{
  create({
    name,
    description,
    start,
    end,
    vacancies,
    organization_id,
  }: IProjectDTO): Promise<Project>;
  findByOrganizationId(organization_id: string): Promise<Project[]>;
  findById(id: string): Promise<Project>;
  filter({
    name,
    start,
    end,
    status,
    state_id,
    city_id,
    organization_type_id,
    organization_id,
  }): Promise<Project[]>;
  update({
    id,
    name,
    description,
    start,
    end,
    vacancies,
    status,
  }: IProjectDTO): Promise<Project>;
}

export { IProjectsRepository };
