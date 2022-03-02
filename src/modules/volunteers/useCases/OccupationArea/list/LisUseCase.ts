import { inject, injectable } from 'tsyringe';

import { OccupationArea } from '@modules/volunteers/infra/typeorm/entities/Occupation_area';
import { IOccupationAreaRepository } from '@modules/volunteers/repositories/IOccupationAreaRepository';

@injectable()
class ListOccupationAreaUseCase {
  constructor(
    @inject('OccupationAreaRepository')
    private occupationAreaRepository: IOccupationAreaRepository,
  ) { }

  async execute(): Promise<OccupationArea[]> {
    const occupationArea = await this.occupationAreaRepository.list();

    return occupationArea;
  }
}

export { ListOccupationAreaUseCase };
