import { inject, injectable } from 'tsyringe';

import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

@injectable()
class UpdateNewUserAvatarUseCase {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}
  async execute(avatar_file: string): Promise<string> {
    await this.storageProvider.save(avatar_file, 'avatar');

    return avatar_file;
  }
}

export { UpdateNewUserAvatarUseCase };
