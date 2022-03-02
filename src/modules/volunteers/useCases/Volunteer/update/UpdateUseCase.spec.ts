import { VolunteersRepositoryInMemory } from '@modules/volunteers/repositories/in-memory/VolunteersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateVolunteerUseCase } from '../create/CreateUseCase';
import { UpdateVolunteerUseCase } from './UpdateUseCase';

let createVolunteerUseCase: CreateVolunteerUseCase;
let updateUseCase: UpdateVolunteerUseCase;
let volunteersRepositoryInMemory: VolunteersRepositoryInMemory;

describe('Update Type Volunteer', () => {
  beforeEach(() => {
    volunteersRepositoryInMemory = new VolunteersRepositoryInMemory();
    createVolunteerUseCase = new CreateVolunteerUseCase(volunteersRepositoryInMemory);
    updateUseCase = new UpdateVolunteerUseCase(volunteersRepositoryInMemory);
  });

  it('should be able to edit a volunteer', async () => {
    const volunteer = await createVolunteerUseCase.execute({
      cpf: '11111',
      profession: 'profession',
      description: 'xxxx',
      avatar: 'xxxx',
      occupation_area_id: 'occupationArea',
      user_id: 'volunteer',
    });

    const volunteerEdit = {
      id: volunteer.id,
      profession: 'Profession Edited',
    };

    await updateUseCase.execute(volunteerEdit);

    const volunteerEdited = await volunteersRepositoryInMemory
      .findByCpf(volunteer.cpf);

    expect(volunteerEdited.profession).toEqual(volunteerEdit.profession);
  });
});
