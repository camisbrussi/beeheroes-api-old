import { VolunteersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/VolunteersRepositoryInMemory';

import { CreateVolunteerUseCase } from './CreateUseCase';

let createVolunteerUseCase: CreateVolunteerUseCase;
let volunteersRepositoryInMemory: VolunteersRepositoryInMemory;

beforeEach(() => {
  volunteersRepositoryInMemory = new VolunteersRepositoryInMemory();
  createVolunteerUseCase = new CreateVolunteerUseCase(
    volunteersRepositoryInMemory,
  );
});

describe('Create Volunteer ', () => {
  it('should be able to create a new volunteer ', async () => {
    const volunteer = await createVolunteerUseCase.execute({
      profession: 'profession',
      description: 'xxxx',
      occupation_area_id: 'occupationArea',
      user_id: 'volunteer',
    });

    const volunteerCreated = await volunteersRepositoryInMemory
      .findById(volunteer.id);

    expect(volunteerCreated).toHaveProperty('id');
  });
});
