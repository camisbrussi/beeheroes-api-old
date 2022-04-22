import { inject, injectable } from 'tsyringe';

import { Volunteer } from '@modules/accounts/infra/typeorm/entities/Volunteer';
import { IVolunteersRepository } from '@modules/accounts/repositories/IVolunteersRepository';

interface IRequest {
    id?: string;
    description?: string,
    occupation_area_id?: number,
}
@injectable()
class UpdateVolunteerUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository,
  ) {}

  async execute({
    id,
    description,
    occupation_area_id,

  }: IRequest): Promise<Volunteer> {
    const volunteer = await this.volunteersRepository.update({
      id,
      description,
      occupation_area_id,
    });

    return volunteer;
  }
}

export { UpdateVolunteerUseCase };
