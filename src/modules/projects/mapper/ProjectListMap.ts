import { instanceToInstance } from 'class-transformer';

import { IProjectDTO } from '../dtos/IProjectDTO';

type Project = {
  id: string;
  name: string;
  start: Date;
  end: Date;
  status_subscription: number;
  status: number;
}

class ProjectListMap {
  static toDTO({
    id,
    name,
    start,
    end,
    status_subscription,
    status,
  }: Project): IProjectDTO {
    const project = instanceToInstance({
      id,
      name,
      start,
      end,
      status_subscription,
      status,
    });
    return project;
  }
}

export { ProjectListMap };
