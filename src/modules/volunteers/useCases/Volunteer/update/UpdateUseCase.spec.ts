import { AddressesRepositoryInMemory } from '@modules/addresses/repositories/in-memory/AddressRepositoryInMemory';
import { VolunteersRepositoryInMemory } from '@modules/volunteers/repositories/in-memory/VolunteersRepositoryInMemory';

import { CreateVolunteerUseCase } from '../create/CreateUseCase';
import { UpdateVolunteerUseCase } from './UpdateUseCase';

let createVolunteerUseCase: CreateVolunteerUseCase;
let updateUseCase: UpdateVolunteerUseCase;
let volunteersRepositoryInMemory: VolunteersRepositoryInMemory;
let addressRepositoryInMemory: AddressesRepositoryInMemory;

describe('Update Type Volunteer', () => {
  beforeEach(() => {
    volunteersRepositoryInMemory = new VolunteersRepositoryInMemory();
    addressRepositoryInMemory = new AddressesRepositoryInMemory();

    createVolunteerUseCase = new CreateVolunteerUseCase(
      volunteersRepositoryInMemory,
      addressRepositoryInMemory,
    );
    updateUseCase = new UpdateVolunteerUseCase(
      volunteersRepositoryInMemory,
      addressRepositoryInMemory,
    );
  });

  it('should be able to edit a volunteer', async () => {
    const volunteer = await createVolunteerUseCase.execute({
      cpf: '11111',
      profession: 'profession',
      description: 'xxxx',
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

  it('should be able to edit a volunteer and add address', async () => {
    const volunteer = await createVolunteerUseCase.execute({
      cpf: '11111',
      profession: 'profession',
      description: 'xxxx',
      occupation_area_id: 'occupationArea',
      user_id: 'volunteer',
    });

    const userEdit = {
      id: volunteer.id,
      address: {
        street: 'Street Example',
        number: '123',
        complement: '123',
        district: 'District',
        cep: 12345,
        city_id: 1,
      },
    };

    await updateUseCase.execute(userEdit);

    const userFind = await volunteersRepositoryInMemory
      .findById(volunteer.id);

    const userAddress = await addressRepositoryInMemory
      .findById(userFind.address_id);

    expect(userAddress.street).toEqual('Street Example');
  });

  it('should be able to edit a volunteer and edit address', async () => {
    const volunteer = await createVolunteerUseCase.execute({
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
    });

    const userEdit = {
      id: volunteer.id,
      address_id: volunteer.address_id,
      address: {
        street: 'Street Example Edited',
        number: '456',
        complement: '123',
        district: 'District',
        cep: 12345,
        city_id: 1,
      },
    };
    const AddressId = volunteer.address_id;

    await updateUseCase.execute(userEdit);

    const userFind = await volunteersRepositoryInMemory
      .findById(volunteer.id);

    const userAddress = await addressRepositoryInMemory
      .findById(userFind.address_id);

    const userAddressDeleted = await addressRepositoryInMemory
      .findById(AddressId);

    expect(userAddress.street).toEqual('Street Example Edited');
    expect(userAddressDeleted).toBeUndefined();
  });
});
