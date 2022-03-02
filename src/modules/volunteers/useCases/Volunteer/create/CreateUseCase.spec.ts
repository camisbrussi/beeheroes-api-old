import { VolunteersRepositoryInMemory } from '@modules/volunteers/repositories/in-memory/VolunteersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateVolunteerUseCase } from './CreateUseCase';

let createVolunteerUseCase: CreateVolunteerUseCase;
let volunteersRepositoryInMemory: VolunteersRepositoryInMemory;

beforeEach(() => {
  volunteersRepositoryInMemory = new VolunteersRepositoryInMemory();
  createVolunteerUseCase = new CreateVolunteerUseCase(volunteersRepositoryInMemory);
});

describe('Create Volunteer ', () => {
  it('should be able to create a new volunteer ', async () => {
    const volunteer = {
      cpf: '0000',
      profession: 'profession',
      description: 'xxxx',
      avatar: 'xxxx',
      occupation_area_id: 'occupationArea',
      user_id: 'volunteer',
    };

    await createVolunteerUseCase.execute(volunteer);

    const volunteerCreated = await volunteersRepositoryInMemory
      .findByCpf(volunteer.cpf);

    expect(volunteerCreated).toHaveProperty('id');
  });

  it('should not be able to create a new  with cpf exists', async () => {
    await createVolunteerUseCase.execute({
      cpf: '11111',
      profession: 'profession',
      description: 'xxxx',
      avatar: 'xxxx',
      occupation_area_id: 'occupationArea',
      user_id: 'volunteer',
    });

    await expect(
      createVolunteerUseCase.execute({
        cpf: '11111',
        profession: 'profession',
        description: 'xxxx',
        avatar: 'xxxx',
        occupation_area_id: 'occupationArea',
        user_id: 'volunteer',
      }),
    ).rejects.toEqual(new AppError('Volunteer already exists'));
  });
});
