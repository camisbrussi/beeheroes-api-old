import { VolunteersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/VolunteersRepositoryInMemory';

import { FindVolunteerUseCase } from './FindUseCase';

let findVolunteerUseCase: FindVolunteerUseCase;
let volunteersRepositoryInMemory: VolunteersRepositoryInMemory;

describe('List Volunteer', () => {
  beforeEach(() => {
    volunteersRepositoryInMemory = new VolunteersRepositoryInMemory();
    findVolunteerUseCase = new FindVolunteerUseCase(volunteersRepositoryInMemory);
  });

  it('should be abe to find volunteer', async () => {
    const newVolunteer = {
      description: 'xxxx',
      occupation_area_id: 'occupationArea',
      user_id: 'volunteer',
    };

    const { id } = await volunteersRepositoryInMemory.create(newVolunteer);

    const volunteer = await findVolunteerUseCase.execute(id);

    expect(volunteer.id).toEqual(id);
  });
});
