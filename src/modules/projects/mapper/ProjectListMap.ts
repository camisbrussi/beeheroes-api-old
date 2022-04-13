import { instanceToInstance } from 'class-transformer';

import { IProjectDTO } from '../dtos/IProjectDTO';

type Project = {
  id: string;
  name: string;
  start: Date;
  end: Date;
  status_project: number;
  status: number;
}

class ProjectListMap {
  static toDTO({
    id,
    name,
    start,
    end,
    status_project,
    status,
  }: Project): IProjectDTO {
    const project = instanceToInstance({
      id,
      name,
      start,
      end,
      status_project,
      status,
    });
    return project;
  }
}

export { ProjectListMap };
