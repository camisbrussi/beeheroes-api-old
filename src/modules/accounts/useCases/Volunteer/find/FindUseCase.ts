import { inject, injectable } from 'tsyringe';

import { VolunteerMap } from '@modules/accounts/mapper/VolunteerMap';
import { IVolunteersRepository } from '@modules/accounts/repositories/IVolunteersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class FindVolunteerUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository,
  ) { }

  async execute(id: string): Promise<VolunteerMap> {
    const volunteer = await this.volunteersRepository.findById(id);

    if (!volunteer) {
      throw new AppError('Volunteer does not exist');
    }

    return VolunteerMap.toDTO({
      id: volunteer.id,
      description: volunteer.description,
      occupation_area: volunteer.occupationArea,
      user: {
        id: volunteer?.user?.id,
      },
    });
  }
}

export { FindVolunteerUseCase };
