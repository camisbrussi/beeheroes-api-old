import { AddressesRepositoryInMemory } from '@modules/addresses/repositories/in-memory/AddressRepositoryInMemory';

import { CreateAddressUseCase } from './CreateUseCase';

let createAddressUseCase: CreateAddressUseCase;
let usersRepositoryInMemory: AddressesRepositoryInMemory;

beforeEach(() => {
  usersRepositoryInMemory = new AddressesRepositoryInMemory();
  createAddressUseCase = new CreateAddressUseCase(usersRepositoryInMemory);
});

describe('Create Address ', () => {
  it('should be able to create a new address ', async () => {
    const address = {
      street: 'street A',
      number: '10',
      complement: '10',
      district: 'District B',
      cep: 95900000,
      city_id: 1,
    };

    const createAddress = await createAddressUseCase.execute(address);

    expect(createAddress.street).toEqual(address.street);
  });
});
