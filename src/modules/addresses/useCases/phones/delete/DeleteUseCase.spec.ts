import { PhonesRepositoryInMemory } from '@modules/addresses/repositories/in-memory/PhonesRepositoryInMemory';

import { DeletePhoneUseCase } from './DeleteUseCase';

let deletePhoneUseCase: DeletePhoneUseCase;
let phonesRepositoryInMemory: PhonesRepositoryInMemory;

describe('Delete Phone', () => {
  beforeEach(() => {
    phonesRepositoryInMemory = new PhonesRepositoryInMemory();
    deletePhoneUseCase = new DeletePhoneUseCase(
      phonesRepositoryInMemory,
    );
  });

  it('should be able to delete a phones', async () => {
    await phonesRepositoryInMemory.create({
      number: '9999999',
      is_whatsapp: true,
      organization_id: '1',
    });

    await deletePhoneUseCase.execute('1');
    const typeUser = await phonesRepositoryInMemory.findByOrganizationId('1');

    expect(typeUser.length).toBe(0);
  });
});
