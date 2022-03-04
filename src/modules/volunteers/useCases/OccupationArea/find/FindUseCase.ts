import { inject, injectable } from 'tsyringe';

import { OccupationArea } from '@modules/volunteers/infra/typeorm/entities/OccupationArea';
import { IOccupationsAreaRepository } from '@modules/volunteers/repositories/IOccupationsAreaRepository';

@injectable()
class FindOccupationAreaUseCase {
  constructor(
    @inject('OccupationsAreaRepository')
    private occupationAreaRepository: IOccupationsAreaRepository,
  ) { }

  async execute(id: string): Promise<OccupationArea> {
    const occupationArea = await this.occupationAreaRepository.findById(id);

    return occupationArea;
  }
}

export { FindOccupationAreaUseCase };
