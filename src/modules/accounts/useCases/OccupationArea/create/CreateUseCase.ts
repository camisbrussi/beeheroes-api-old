import { inject, injectable } from 'tsyringe';

import { OccupationArea } from '@modules/accounts/infra/typeorm/entities/OccupationArea';
import { IOccupationsAreaRepository } from '@modules/accounts/repositories/IOccupationsAreaRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest{
  id?: number;
  name: string,
}

@injectable()
class CreateOccupationAreaUseCase {
  constructor(
    @inject('OccupationsAreaRepository')
    private occupationAreaRepository: IOccupationsAreaRepository,
  ) {}

  async execute({ name, id }: IRequest): Promise<OccupationArea> {
    const occupationAreaExist = await this.occupationAreaRepository.findByName(name);

    if (occupationAreaExist) {
      throw new AppError('Occupation Area already exists!');
    }

    const occupationArea = await this.occupationAreaRepository.create({
      id,
      name,
    });

    return occupationArea;
  }
}

export { CreateOccupationAreaUseCase };
