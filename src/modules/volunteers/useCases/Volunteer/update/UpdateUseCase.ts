import { inject, injectable } from 'tsyringe';

import { Volunteer } from '@modules/volunteers/infra/typeorm/entities/Volunteer';
import { IVolunteersRepository } from '@modules/volunteers/repositories/IVolunteersRepository';

interface IRequest {
    id?: string;
    profession?: string;
    description?: string,
    avatar?: string,
    occupation_area_id?: string,
}
@injectable()
class UpdateVolunteerUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository,
  ) {}

  async execute({
    id,
    profession,
    description,
    avatar,
    occupation_area_id,
  }: IRequest): Promise<Volunteer> {
    const volunteerType = await this.volunteersRepository.update({
      id,
      profession,
      description,
      avatar,
      occupation_area_id,
    });

    return volunteerType;
  }
}

export { UpdateVolunteerUseCase };
