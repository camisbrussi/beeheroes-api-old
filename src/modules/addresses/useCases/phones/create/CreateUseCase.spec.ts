import { PhonesRepositoryInMemory } from '@modules/addresses/repositories/in-memory/PhonesRepositoryInMemory';

import { CreatePhoneUseCase } from './CreateUseCase';

let createPhoneUseCase: CreatePhoneUseCase;
let phonesRepositoryInMemory: PhonesRepositoryInMemory;

beforeEach(() => {
  phonesRepositoryInMemory = new PhonesRepositoryInMemory();
  createPhoneUseCase = new CreatePhoneUseCase(phonesRepositoryInMemory);
});

describe('Create Phone ', () => {
  it('should be able to create a new address ', async () => {
    const phone = {
      number: '9999999',
      is_whatsapp: true,
      organization_id: '1',
    };

    const createPhone = await createPhoneUseCase.execute(phone);

    expect(createPhone.number).toEqual(phone.number);
  });
});
