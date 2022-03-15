import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { OrganizationsRepositoryInMemory } from '@modules/organizations/repositories/in-memory/OrganizationRepositoryInMemory';
import { EvaluationsRepositoryInMemory } from '@modules/projects/repositories/in-memory/EvaluationRepositoryInMemory';
import { ProjectsRepositoryInMemory } from '@modules/projects/repositories/in-memory/ProjectRepositoryInMemory';
import { SubscriptionsRepositoryInMemory } from '@modules/projects/repositories/in-memory/SubscriptionRepositoryInMemory';
import { VolunteersRepositoryInMemory } from '@modules/volunteers/repositories/in-memory/VolunteersRepositoryInMemory';

import { UpdateEvaluationUseCase } from './UpdateUseCase';

let updateEvaluationUseCase: UpdateEvaluationUseCase;
let evaluationsRepositoryInMemory: EvaluationsRepositoryInMemory;
let subscriptionRepositoryInMemory: SubscriptionsRepositoryInMemory;
let projectsRepositoryInMemory: ProjectsRepositoryInMemory;
let volunteersRepositoryInMemory: VolunteersRepositoryInMemory;
let organizationsRepositoryInMemory: OrganizationsRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;

beforeEach(() => {
  evaluationsRepositoryInMemory = new EvaluationsRepositoryInMemory();
  subscriptionRepositoryInMemory = new SubscriptionsRepositoryInMemory();
  projectsRepositoryInMemory = new ProjectsRepositoryInMemory();
  volunteersRepositoryInMemory = new VolunteersRepositoryInMemory();
  usersRepositoryInMemory = new UsersRepositoryInMemory();
  organizationsRepositoryInMemory = new OrganizationsRepositoryInMemory();
  updateEvaluationUseCase = new UpdateEvaluationUseCase(
    evaluationsRepositoryInMemory,
  );
});

it('should be able to edit a evaluation', async () => {
  const organization = await organizationsRepositoryInMemory.create({
    name: 'Organization Name',
    email: 'organization@beeheroes.com',
    cnpj: '000000000000',
    description: 'Description Organization',
    organization_type_id: 'id',
  });

  const project = await projectsRepositoryInMemory.create({
    name: 'Test Project',
    description: 'Test Project',
    start: new Date(),
    end: new Date(),
    vacancies: 2,
    organization_id: organization.id,
  });

  const user = await await usersRepositoryInMemory.create({
    name: 'Name test',
    email: 'teste@beeheroes.com',
    password: '123456',
  });

  const volunteer = await volunteersRepositoryInMemory.create({
    cpf: '0000',
    profession: 'profession',
    description: 'xxxx',
    occupation_area_id: 'occupationArea',
    user_id: user.id,
  });

  const subscription = await subscriptionRepositoryInMemory.create({
    registration_date: new Date(),
    project_id: project.id,
    volunteer_id: volunteer.id,
  });

  const evaluation = await evaluationsRepositoryInMemory.create({
    score: 5,
    description: 'xxxx',
    subscription_id: subscription.id,
  });

  const evaluationEdited = await updateEvaluationUseCase.execute({
    id: evaluation.id,
    score: 4,
  });

  expect(evaluationEdited.score).toEqual(4);
});
