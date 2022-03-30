import { getRepository, Repository } from 'typeorm';

import { ICitiesRepository } from '@modules/addresses/repositories/ICitiesRepository';

import { City } from '../entities/City';
import { State } from '../entities/State';

class CitiesRepository implements ICitiesRepository {
  private repositoryStates: Repository<State>
  private repositoryCities: Repository<City>

  constructor() {
    this.repositoryCities = getRepository(City);
    this.repositoryStates = getRepository(State);
  }

  async listByState(id: number): Promise<City[]> {
    const cities = await this.repositoryCities.find({ state_id: id });
    return cities;
  }

  async list(): Promise<State[]> {
    const states = await this.repositoryStates.find();
    return states;
  }
}

export { CitiesRepository };
