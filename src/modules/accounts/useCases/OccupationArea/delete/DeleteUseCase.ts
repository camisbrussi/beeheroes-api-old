import { inject, injectable } from 'tsyringe';

import { IOccupationsAreaRepository } from '@modules/accounts/repositories/IOccupationsAreaRepository';
import { IVolunteersRepository } from '@modules/accounts/repositories/IVolunteersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteOccupationAreaUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository,
    @inject('OccupationsAreaRepository')
    private occupationAreaRepository: IOccupationsAreaRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const occupationAreaUsed = await this.volunteersRepository
      .listVolunteersByOccupationArea(id);

    if (occupationAreaUsed.length > 0) {
      throw new AppError("Occupation Area is in use and can't deleted!");
    }

    await this.occupationAreaRepository.delete(id);
  }
}

export { DeleteOccupationAreaUseCase };
