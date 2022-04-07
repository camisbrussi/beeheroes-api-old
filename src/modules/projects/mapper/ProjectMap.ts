import { instanceToInstance } from 'class-transformer';

import { IProjectDTO } from '../dtos/IProjectDTO';

type Project = {
  id: string;
  name: string;
  description: string;
  start: Date;
  end: Date;
  status: number;
  vacancies: number;
  total_subscription: number;
  organization_id: string;
}

class ProjectMap {
  static toDTO({
    id,
    name,
    description,
    start,
    end,
    status,
    vacancies,
    total_subscription,
    organization_id,
  }: Project): IProjectDTO {
    const project = instanceToInstance({
      id,
      name,
      description,
      start,
      end,
      status,
      vacancies,
      total_subscription,
      organization_id,
    });
    return project;
  }
}

export { ProjectMap };
