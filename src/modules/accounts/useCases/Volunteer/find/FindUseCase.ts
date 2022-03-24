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
      user_id: volunteer.user_id,
      description: volunteer.description,
      profession: volunteer.description,
      occupation_area: {
        name: volunteer.occupationArea?.name,
      },
    });
  }
}

export { FindVolunteerUseCase };
