import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AddressesRepositoryInMemory } from '@modules/addresses/repositories/in-memory/AddressRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../create/CreateUseCase';
import { UpdateUserUseCase } from './UpdateUseCase';

let createUserUseCase: CreateUserUseCase;
let updateUseCase: UpdateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let addressRepositoryInMemory: AddressesRepositoryInMemory;

describe('Update Type User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    addressRepositoryInMemory = new AddressesRepositoryInMemory();

    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      addressRepositoryInMemory,
    );
    updateUseCase = new UpdateUserUseCase(
      usersRepositoryInMemory,
      addressRepositoryInMemory,
    );
  });

  it('should be able to edit a user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Admin',
      email: 'admin@beeheroes.com',
      password: '123456',
      is_volunteer: false,
    });

    const userEdit = {
      id: user.id,
      name: 'Admin editado',
      email: 'editado@beeheroes.com',
    };

    await updateUseCase.execute(userEdit);

    const userEdited = await usersRepositoryInMemory.findByEmail(userEdit.email);

    expect(userEdited.name).toEqual(userEdit.name);
    expect(userEdited.email).toEqual(userEdit.email);
  });

  it('should be able to edit a user name', async () => {
    const user = await createUserUseCase.execute({
      name: 'Admin',
      email: 'admin@beeheroes.com',
      password: '123456',
      is_volunteer: false,
    });

    const userEdit = {
      id: user.id,
      name: 'User name editado',
    };

    await updateUseCase.execute(userEdit);

    const userEdited = await usersRepositoryInMemory.findByEmail(user.email);

    expect(userEdited.name).toEqual(userEdit.name);
    expect(userEdited.email).toEqual(user.email);
  });

  it('should not be able to edit a user with exists email', async () => {
    await expect(async () => {
      const user = await createUserUseCase.execute({
        name: 'Admin',
        email: 'admin1@beeheroes.com',
        password: '123456',
        is_volunteer: false,
      });

      const userEdit = {
        id: user.id,
        email: 'admin1@beeheroes.com',
      };
      await updateUseCase.execute(userEdit);
    }).rejects.toEqual(new AppError('User already exists!'));
  });
  it('should be able to edit a user and edit address', async () => {
    const user = await createUserUseCase.execute({
      name: 'Admin',
      email: 'admin1@beeheroes.com',
      password: '123456',
      is_volunteer: false,
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
      id: user.id,
      address_id: user.address_id,
      address: {
        street: 'Street Example Edited',
        number: '456',
        complement: '123',
        district: 'District',
        cep: 12345,
        city_id: 1,
      },
    };
    const AddressId = user.address_id;

    await updateUseCase.execute(userEdit);

    const userFind = await usersRepositoryInMemory
      .findById(user.id);

    const userAddress = await addressRepositoryInMemory
      .findById(userFind.address_id);

    const userAddressDeleted = await addressRepositoryInMemory
      .findById(AddressId);

    expect(userAddress.street).toEqual('Street Example Edited');
    expect(userAddressDeleted).toBeUndefined();
  });
});
