import { inject, injectable } from 'tsyringe';

import { IOrganizationImagesRepository } from '@modules/organizations/repositories/IOrganizationImagesRepository';

@injectable()
class DeleteOrganizationImageUseCase {
  constructor(
    @inject('OrganizationImagesRepository')
    private organizationImagesRepository: IOrganizationImagesRepository,
  ) {}

  async execute(organization_id: string): Promise<void> {
    await this.organizationImagesRepository.deleteByIdOrOrganization(organization_id);
  }
}

export { DeleteOrganizationImageUseCase };
