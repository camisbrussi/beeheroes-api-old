import { inject, injectable } from 'tsyringe';

import { OccupationArea } from '@modules/volunteers/infra/typeorm/entities/Occupation_area';
import { IOccupationAreaRepository } from '@modules/volunteers/repositories/IOccupationAreaRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string,
  name?:string,
}
@injectable()
class UpdateOccupationAreaUseCase {
  constructor(
    @inject('OccupationAreaRepository')
    private occupationAreaRepository: IOccupationAreaRepository,
  ) {}

  async execute({ id, name }: IRequest): Promise<OccupationArea> {
    const occupationAreaExist = await this.occupationAreaRepository.findByName(name);

    if (occupationAreaExist) {
      throw new AppError('Occupation area already exists!');
    }

    const occupationArea = await this.occupationAreaRepository.update({
      id,
      name,
    });

    return occupationArea;
  }
}

export { UpdateOccupationAreaUseCase };
