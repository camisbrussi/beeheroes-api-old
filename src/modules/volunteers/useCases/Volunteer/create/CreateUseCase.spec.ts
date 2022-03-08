import { AddressesRepositoryInMemory } from '@modules/addresses/repositories/in-memory/AddressRepositoryInMemory';
import { VolunteersRepositoryInMemory } from '@modules/volunteers/repositories/in-memory/VolunteersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateVolunteerUseCase } from './CreateUseCase';

let createVolunteerUseCase: CreateVolunteerUseCase;
let volunteersRepositoryInMemory: VolunteersRepositoryInMemory;
let addressesRepositoryInMemory: AddressesRepositoryInMemory;

beforeEach(() => {
  volunteersRepositoryInMemory = new VolunteersRepositoryInMemory();
  addressesRepositoryInMemory = new AddressesRepositoryInMemory();
  createVolunteerUseCase = new CreateVolunteerUseCase(
    volunteersRepositoryInMemory,
    addressesRepositoryInMemory,
  );
});

describe('Create Volunteer ', () => {
  it('should be able to create a new volunteer ', async () => {
    const volunteer = {
      cpf: '0000',
      profession: 'profession',
      description: 'xxxx',
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
      occupation_area_id: 'occupationArea',
      user_id: 'volunteer',
    });

    await expect(
      createVolunteerUseCase.execute({
        cpf: '11111',
        profession: 'profession',
        description: 'xxxx',
        occupation_area_id: 'occupationArea',
        user_id: 'volunteer',
      }),
    ).rejects.toEqual(new AppError('Volunteer already exists'));
  });

  it('should be able to create a new volunteer with address', async () => {
    const volunteer = {
      cpf: '11111',
      profession: 'profession',
      description: 'xxxx',
      occupation_area_id: 'occupationArea',
      user_id: 'volunteer',
      address: {
        street: 'Street Example',
        number: '123',
        complement: '123',
        district: 'District',
        cep: 12345,
        city_id: 1,
      },
    };

    await createVolunteerUseCase.execute(volunteer);

    const userCreated = await volunteersRepositoryInMemory.findByCpf('11111');
    expect(userCreated).toHaveProperty('id');
  });
});
