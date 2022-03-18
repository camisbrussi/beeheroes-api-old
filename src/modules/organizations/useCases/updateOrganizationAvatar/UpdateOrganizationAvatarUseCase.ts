import { inject, injectable } from 'tsyringe';

import { OrganizationsRepository } from '@modules/organizations/infra/typeorm/repositories/OrganzationsRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

interface IRequest {
  organization_id: string;
  avatar_file: string;
}

@injectable()
class UpdateOrganizationAvatarUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: OrganizationsRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}
  async execute({ organization_id, avatar_file }: IRequest): Promise<void> {
    const organization = await this.organizationsRepository.findById(organization_id);

    if (organization.organization.avatar) {
      await this.storageProvider.delete(organization.organization.avatar, 'avatar');
    }

    await this.storageProvider.save(avatar_file, 'avatar');
    organization.organization.avatar = avatar_file;

    await this.organizationsRepository.create(organization.organization);
  }
}

export { UpdateOrganizationAvatarUseCase };
