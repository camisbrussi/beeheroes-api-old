import { inject, injectable } from 'tsyringe';

import { OccupationArea } from '@modules/volunteers/infra/typeorm/entities/OccupationArea';
import { IOccupationsAreaRepository } from '@modules/volunteers/repositories/IOccupationsAreaRepository';

@injectable()
class ListOccupationAreaUseCase {
  constructor(
    @inject('OccupationsAreaRepository')
    private occupationAreaRepository: IOccupationsAreaRepository,
  ) { }

  async execute(): Promise<OccupationArea[]> {
    const occupationArea = await this.occupationAreaRepository.list();

    return occupationArea;
  }
}

export { ListOccupationAreaUseCase };
