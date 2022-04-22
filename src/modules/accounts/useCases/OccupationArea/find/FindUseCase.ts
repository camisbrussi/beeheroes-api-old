import { inject, injectable } from 'tsyringe';

import { OccupationArea } from '@modules/accounts/infra/typeorm/entities/OccupationArea';
import { IOccupationsAreaRepository } from '@modules/accounts/repositories/IOccupationsAreaRepository';

@injectable()
class FindOccupationAreaUseCase {
  constructor(
    @inject('OccupationsAreaRepository')
    private occupationAreaRepository: IOccupationsAreaRepository,
  ) { }

  async execute(id: number): Promise<OccupationArea> {
    const occupationArea = await this.occupationAreaRepository.findById(id);

    return occupationArea;
  }
}

export { FindOccupationAreaUseCase };
