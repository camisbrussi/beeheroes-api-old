import { VolunteersRepositoryInMemory } from '@modules/volunteers/repositories/in-memory/VolunteersRepositoryInMemory';

import { ListVolunteersUseCase } from './ListUseCase';

let listVolunteersUseCase: ListVolunteersUseCase;
let volunteersRepositoryInMemory: VolunteersRepositoryInMemory;

describe('List Volunteer', () => {
  beforeEach(() => {
    volunteersRepositoryInMemory = new VolunteersRepositoryInMemory();
    listVolunteersUseCase = new ListVolunteersUseCase(volunteersRepositoryInMemory);
  });

  it('should be abe to list all volunteer', async () => {
    const newVolunteer = await volunteersRepositoryInMemory.create({
      cpf: '11111',
      profession: 'profession',
      description: 'xxxx',
      occupation_area_id: 'occupationArea',
      user_id: 'volunteer',
    });

    const volunteer = await listVolunteersUseCase.execute();

    expect(volunteer).toEqual([newVolunteer]);
  });
});
