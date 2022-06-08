import { VolunteersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/VolunteersRepositoryInMemory';

import { CreateVolunteerUseCase } from '../create/CreateUseCase';
import { UpdateVolunteerUseCase } from './UpdateUseCase';

let createVolunteerUseCase: CreateVolunteerUseCase;
let updateUseCase: UpdateVolunteerUseCase;
let volunteersRepositoryInMemory: VolunteersRepositoryInMemory;

describe('Update Type Volunteer', () => {
  beforeEach(() => {
    volunteersRepositoryInMemory = new VolunteersRepositoryInMemory();

    createVolunteerUseCase = new CreateVolunteerUseCase(
      volunteersRepositoryInMemory,
    );
    updateUseCase = new UpdateVolunteerUseCase(
      volunteersRepositoryInMemory,
    );
  });

  it('should be able to edit a volunteer', async () => {
    const volunteer = await createVolunteerUseCase.execute({
      description: 'xxxx',
      occupation_area_id: 1,
      user_id: 'volunteer',
    });

    const volunteerEdit = {
      id: volunteer.id,
    };

    await updateUseCase.execute(volunteerEdit);

    const volunteerEdited = await volunteersRepositoryInMemory
      .findById(volunteer.id);
  });
});
