import { inject, injectable } from 'tsyringe';

import { Volunteer } from '@modules/accounts/infra/typeorm/entities/Volunteer';
import { IVolunteersRepository } from '@modules/accounts/repositories/IVolunteersRepository';

interface IRequest {
    id?: string;
    profession: string;
    description?: string,
    occupation_area_id: string,
    user_id: string,
}

@injectable()
class CreateVolunteerUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository,

  ) {}

  async execute({
    id,
    profession,
    description,
    occupation_area_id,
    user_id,

  }: IRequest): Promise<Volunteer> {
    const volunteer = await this.volunteersRepository.create({
      id,
      profession,
      description,
      occupation_area_id,
      user_id,

    });

    return volunteer;
  }
}

export { CreateVolunteerUseCase };
