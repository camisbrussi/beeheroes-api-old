import { inject, injectable } from 'tsyringe';

import { IOccupationAreaRepository } from '@modules/volunteers/repositories/IOccupationAreaRepository';
import { IVolunteersRepository } from '@modules/volunteers/repositories/IVolunteersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteOccupationAreaUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository,
    @inject('OccupationAreaRepository')
    private occupationAreaRepository: IOccupationAreaRepository,
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
