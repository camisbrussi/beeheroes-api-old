import { inject, injectable } from 'tsyringe';

import { OccupationArea } from '@modules/volunteers/infra/typeorm/entities/Occupation_area';
import { IOccupationAreaRepository } from '@modules/volunteers/repositories/IOccupationAreaRepository';

@injectable()
class FindOccupationAreaUseCase {
  constructor(
    @inject('OccupationAreaRepository')
    private occupationAreaRepository: IOccupationAreaRepository,
  ) { }

  async execute(id: string): Promise<OccupationArea> {
    const occupationArea = await this.occupationAreaRepository.findById(id);

    return occupationArea;
  }
}

export { FindOccupationAreaUseCase };
