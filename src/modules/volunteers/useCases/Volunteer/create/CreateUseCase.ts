import { inject, injectable } from 'tsyringe';

import { Volunteer } from '@modules/volunteers/infra/typeorm/entities/Volunteer';
import { IVolunteersRepository } from '@modules/volunteers/repositories/IVolunteersRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
    id?: string;
    cpf: string;
    profession: string;
    description?: string,
    avatar?: string,
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
    cpf,
    profession,
    description,
    avatar,
    occupation_area_id,
    user_id,
  }: IRequest): Promise<Volunteer> {
    const volunteerAlreadyExists = await this.volunteersRepository.findByCpf(cpf);

    if (volunteerAlreadyExists) {
      throw new AppError('Volunteer already exists');
    }

    const volunteer = await this.volunteersRepository.create({
      id,
      cpf,
      profession,
      description,
      avatar,
      occupation_area_id,
      user_id,
    });

    return volunteer;
  }
}

export { CreateVolunteerUseCase };
