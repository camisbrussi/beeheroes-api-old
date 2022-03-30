import { inject, injectable } from 'tsyringe';

import { State } from '@modules/addresses/infra/typeorm/entities/State';
import { ICitiesRepository } from '@modules/addresses/repositories/ICitiesRepository';

@injectable()
class ListStatesUseCase {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  async execute(): Promise<State[]> {
    const states = await this.citiesRepository.list();

    return states;
  }
}

export { ListStatesUseCase };
