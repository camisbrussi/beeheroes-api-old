import { AddressRepositoryInMemory } from '@modules/address/repositories/in-memory/AddressRepositoryInMemory';

import { FindAddressUseCase } from './FindUseCase';

let findAddressUseCase: FindAddressUseCase;
let usersRepositoryInMemory: AddressRepositoryInMemory;

describe('List Address ', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new AddressRepositoryInMemory();
    findAddressUseCase = new FindAddressUseCase(usersRepositoryInMemory);
  });

  it('should be abe to find address for id', async () => {
    const address = {
      street: 'street A',
      number: '10',
      complement: '10',
      district: 'District B',
      cep: 95900000,
      city_id: 1,
    };

    const { id } = await usersRepositoryInMemory.create(address);

    const users = await findAddressUseCase.execute(id);

    expect(users.id).toEqual(id);
  });
});
