import { getRepository, Repository } from 'typeorm';

import { IProjectDTO } from '@modules/projects/dtos/IProjectDTO';
import { IProjectsRepository } from '@modules/projects/repositories/IProjectsRepository';

import { Project } from '../entities/Project';
import { Subscription } from '../entities/Subscription';

class ProjectsRepository implements IProjectsRepository {
  private projectsRepository: Repository<Project>
  private subscriptionsRepository: Repository<Subscription>

  constructor() {
    this.projectsRepository = getRepository(Project);
    this.subscriptionsRepository = getRepository(Subscription);
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
    const project = await this.projectsRepository
      .createQueryBuilder('project')
      .where('project.id = :id', { id })
      .getOne();

    if (project) {
      const totalSubscription = await this.subscriptionsRepository.count({ project_id: id });

      project.total_subscription = totalSubscription;
    }

    return project;
  }

  async filter({
    name,
    start,
    end,
    status,
    organization_type_id,
    city_id,
    state_id,
    organization_id,
  }): Promise<Project[]> {
    const projectsQuery = await this.projectsRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.organization', 'organizations')
      .leftJoinAndSelect('organizations.address', 'addresses')
      .leftJoinAndSelect('addresses.city', 'cities')
      .leftJoinAndSelect('cities.state', 'states')
      .where('1 = 1');

    if (name) {
      projectsQuery.andWhere('project.name ilike :name', { name: `%${name}%` });
    }

    if (start) {
      projectsQuery.andWhere('project.start > :start', { start });
    }

    if (end) {
      projectsQuery.andWhere('project.end < :end', { end });
    }

    if (status) {
      projectsQuery.andWhere('project.status = :status', { status });
    }

    if (organization_type_id) {
      projectsQuery.andWhere('organizations.organization_type_id = :organization_type_id', { organization_type_id });
    }

    if (organization_id) {
      projectsQuery.andWhere('project.organization_id = :organization_id', { organization_id });
    }

    if (city_id) {
      projectsQuery.andWhere('cities.id = :city_id', { city_id });
    }

    if (state_id) {
      projectsQuery.andWhere('states.id = :state_id', { state_id });
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
    if (vacancies !== null) setProject.vacancies = vacancies;

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
