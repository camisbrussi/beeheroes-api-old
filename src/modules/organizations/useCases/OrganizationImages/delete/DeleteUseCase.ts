import { inject, injectable } from 'tsyringe';

import { IOrganizationImagesRepository } from '@modules/organizations/repositories/IOrganizationImagesRepository';

@injectable()
class DeleteOrganizationImageUseCase {
  constructor(
    @inject('OrganizationImagesRepository')
    private phonesRepository: IOrganizationImagesRepository,
  ) {}

  async execute(organization_id: string): Promise<void> {
    await this.phonesRepository.deleteByIdOrOrganization(organization_id);
  }
}

export { DeleteOrganizationImageUseCase };
