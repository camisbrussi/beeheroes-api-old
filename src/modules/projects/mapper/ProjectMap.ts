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
  organization: {
    id: string;
    name: string;
    avatar_url: string;
    address: {
      city: string;
      uf: string;
    }
  };
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
    organization,
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
      organization,
    });
    return project;
  }
}

export { ProjectMap };
