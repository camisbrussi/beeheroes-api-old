import { inject, injectable } from 'tsyringe';

import { OccupationArea } from '@modules/volunteers/infra/typeorm/entities/Occupation_area';
import { IOccupationAreaRepository } from '@modules/volunteers/repositories/IOccupationAreaRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest{
  name: string,
  description?: string,
}

@injectable()
class CreateOccupationAreaUseCase {
  constructor(
    @inject('OccupationAreaRepository')
    private occupationAreaRepository: IOccupationAreaRepository,
  ) {}

  async execute({ name }: IRequest): Promise<OccupationArea> {
    const occupationAreaExist = await this.occupationAreaRepository.findByName(name);

    if (occupationAreaExist) {
      throw new AppError('Occupation Area already exists!');
    }

    const occupationArea = await this.occupationAreaRepository.create({
      name,
    });

    return occupationArea;
  }
}

export { CreateOccupationAreaUseCase };
