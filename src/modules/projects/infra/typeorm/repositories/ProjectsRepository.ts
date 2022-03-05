import { getRepository, Repository } from 'typeorm';

import { IProjectDTO } from '@modules/projects/dtos/IProjectDTO';
import { IProjectsRepository } from '@modules/projects/repositories/IProjectsRepository';

import { Project } from '../entities/Project';

class ProjectsRepository implements IProjectsRepository {
  private projectsRepository: Repository<Project>

  constructor() {
    this.projectsRepository = getRepository(Project);
  }

  async create({
    name,
    description,
    start,
    end,
    vacancies,
    organization_id,
  }: IProjectDTO): Promise<Project> {
    const project = this.projectsRepository.create({
      name,
      description,
      start,
      end,
      vacancies,
      organization_id,
    });

    await this.projectsRepository.save(project);

    return project;
  }

  async findByOrganizationId(organization_id: string): Promise<Project[]> {
    const projects = await this.projectsRepository.find({ organization_id });

    return projects;
  }

  async findById(id: string): Promise<Project> {
    const project = await this.projectsRepository.findOne({ id });

    return project;
  }

  async list(): Promise<Project[]> {
    const project = await this.projectsRepository.find();
    return project;
  }

  async filter({
    name,
    start,
    end,
    status,
    organization_id,
  }: IProjectDTO): Promise<Project[]> {
    const projectsQuery = await this.projectsRepository
      .createQueryBuilder('u')
      .where('1 = 1');

    if (name) {
      projectsQuery.andWhere('name like :name', { name: `%${name}%` });
    }

    if (start) {
      projectsQuery.andWhere('start > :start', { start });
    }

    if (end) {
      projectsQuery.andWhere('end < :end', { end });
    }

    if (status) {
      projectsQuery.andWhere('status = :status', { status });
    }

    if (organization_id) {
      projectsQuery.andWhere('organization_id = :organization_id', { organization_id });
    }

    const projects = await projectsQuery.getMany();

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
    const setProject: IProjectDTO = { };

    if (name) setProject.name = name;
    if (start) setProject.start = start;
    if (description) setProject.description = description;
    if (end) setProject.end = end;
    if (status) setProject.status = status;
    if (vacancies) setProject.vacancies = vacancies;

    const projectTypeEdited = await this.projectsRepository
      .createQueryBuilder()
      .update()
      .set(setProject)
      .where('id = :id')
      .setParameters({ id })
      .execute();

    return projectTypeEdited.raw;
  }
}

export { ProjectsRepository };
