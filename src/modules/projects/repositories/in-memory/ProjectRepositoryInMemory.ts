import { IProjectDTO } from '@modules/projects/dtos/IProjectDTO';
import { Project } from '@modules/projects/infra/typeorm/entities/Project';

import { IProjectsRepository } from '../IProjectsRepository';

class ProjectsRepositoryInMemory implements IProjectsRepository {
  projects: Project[] = [];

  async create({
    name,
    description,
    start,
    end,
    vacancies,
    organization_id,
  }: IProjectDTO): Promise<Project> {
    const project = new Project();

    Object.assign(project, {
      name,
      description,
      start,
      end,
      vacancies,
      organization_id,
    });

    this.projects.push(project);

    return (project);
  }

  async findByOrganizationId(organization_id: string): Promise<Project[]> {
    const projects = this.projects
      .filter((project) => organization_id.includes(project.organization_id));

    return projects;
  }

  async findById(id: string): Promise<Project> {
    const project = this.projects.find((project) => project.id === id);

    return project;
  }

  async filter({
    name,
    start,
    end,
    status,
    organization_id,
  }: IProjectDTO): Promise<Project[]> {
    const projects = this.projects.filter((project) => {
      if ((start && project.start > start)
        || (name && project.name.includes(name))
        || (status && project.status === status)
        || (end && project.end < end)
        || (organization_id && project.organization_id === organization_id)
      ) {
        return project;
      }
      return null;
    });

    return projects;
  }

  async update({
    id,
    name,
    description,
    start,
    end,
    vacancies,
    status,
  }: IProjectDTO): Promise<Project> {
    const findIndex = this.projects.findIndex((project) => project.id === id);

    if (name) this.projects[findIndex].name = name;
    if (start) this.projects[findIndex].start = start;
    if (description) this.projects[findIndex].description = description;
    if (end) this.projects[findIndex].end = end;
    if (status) this.projects[findIndex].status = status;
    if (vacancies) this.projects[findIndex].vacancies = vacancies;

    return this.projects[findIndex];
  }
}

export { ProjectsRepositoryInMemory };
