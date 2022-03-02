import { inject, injectable } from 'tsyringe';

import { Volunteer } from '@modules/volunteers/infra/typeorm/entities/Volunteer';
import { IVolunteersRepository } from '@modules/volunteers/repositories/IVolunteersRepository';

@injectable()
class ListVolunteersUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository,
  ) { }

  async execute(): Promise<Volunteer[]> {
    const volunteer = await this.volunteersRepository.list();

    return volunteer;
  }
}

export { ListVolunteersUseCase };
