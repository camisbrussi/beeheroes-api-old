import { inject, injectable } from 'tsyringe';

import { Volunteer } from '@modules/accounts/infra/typeorm/entities/Volunteer';
import { IVolunteersRepository } from '@modules/accounts/repositories/IVolunteersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class FindVolunteerUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository,
  ) { }

  async execute(id: string): Promise<Volunteer> {
    const volunteer = await this.volunteersRepository.findById(id);

    if (!volunteer) {
      throw new AppError('Volunteer does not exist');
    }

    return volunteer;
  }
}

export { FindVolunteerUseCase };
