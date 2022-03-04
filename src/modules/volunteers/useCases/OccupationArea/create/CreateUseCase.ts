import { inject, injectable } from 'tsyringe';

import { OccupationArea } from '@modules/volunteers/infra/typeorm/entities/OccupationArea';
import { IOccupationsAreaRepository } from '@modules/volunteers/repositories/IOccupationsAreaRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest{
  name: string,
  description?: string,
}

@injectable()
class CreateOccupationAreaUseCase {
  constructor(
    @inject('OccupationsAreaRepository')
    private occupationAreaRepository: IOccupationsAreaRepository,
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
