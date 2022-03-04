import { inject, injectable } from 'tsyringe';

import { IPhonesRepository } from '@modules/addresses/repositories/IPhonesRepository';

@injectable()
class DeletePhoneUseCase {
  constructor(
    @inject('PhonesRepository')
    private phonesRepository: IPhonesRepository,
  ) {}

  async execute(organization_id: string): Promise<void> {
    await this.phonesRepository.deleteByIdOrOrganization(organization_id);
  }
}

export { DeletePhoneUseCase };
