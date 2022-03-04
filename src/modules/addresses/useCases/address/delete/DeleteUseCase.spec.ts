import { AddressesRepositoryInMemory } from '@modules/addresses/repositories/in-memory/AddressRepositoryInMemory';

import { DeleteAddressUseCase } from './DeleteUseCase';

let deleteAddressUseCase: DeleteAddressUseCase;
let addressRepositoryInMemory: AddressesRepositoryInMemory;

describe('Delete Address', () => {
  beforeEach(() => {
    addressRepositoryInMemory = new AddressesRepositoryInMemory();
    deleteAddressUseCase = new DeleteAddressUseCase(
      addressRepositoryInMemory,
    );
  });

  it('should be able to delete a address', async () => {
    await addressRepositoryInMemory.create({

      street: 'street A',
      number: '10',
      complement: '10',
      district: 'District B',
      cep: 95900000,
      city_id: 1,
    });

    await deleteAddressUseCase.execute('1');
    const typeUser = await addressRepositoryInMemory.findById('1');

    expect(typeUser).toBeUndefined();
  });
});
