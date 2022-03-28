import { inject, injectable } from 'tsyringe';

import { City } from '@modules/addresses/infra/typeorm/entities/City';
import { ICitiesRepository } from '@modules/addresses/repositories/ICitiesRepository';

@injectable()
class ListCitiesUseCase {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  async execute(): Promise<City[]> {
    const cities = await this.citiesRepository.list();

    return cities;
  }
}

export { ListCitiesUseCase };
