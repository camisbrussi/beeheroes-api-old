import { OrganizationsRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationRepositoryInMemory';
import { ProjectsRepositoryInMemory } from '@modules/projects/repositories/in-memory/ProjectRepositoryInMemory';

import { UpdateProjectUseCase } from './UpdateUseCase';

let updateProjectUseCase: UpdateProjectUseCase;
let projectsRepositoryInMemory: ProjectsRepositoryInMemory;

describe('Update Type Project', () => {
  beforeEach(() => {
    projectsRepositoryInMemory = new ProjectsRepositoryInMemory();
    updateProjectUseCase = new UpdateProjectUseCase(
      projectsRepositoryInMemory,
    );
  });

  it('should be able to edit a project', async () => {
    const project = await projectsRepositoryInMemory.create({
      id: '123456',
      name: 'Project Name',
      description: 'Test Project',
      start: new Date(),
      end: new Date(),
      vacancies: 2,
      organization_id: 'id',
    });

    const projectEdit = {
      id: project.id,
      name: 'Project Name edited',
      vacancies: 4,
      status: Number(process.env.PROJECT_STATUS_FINISHED),
    };

    const editedProject = await updateProjectUseCase.execute(projectEdit);

    expect(editedProject.name).toEqual(projectEdit.name);
    expect(editedProject.vacancies).toEqual(projectEdit.vacancies);
    expect(editedProject.status).toEqual(projectEdit.status);
  });
});
