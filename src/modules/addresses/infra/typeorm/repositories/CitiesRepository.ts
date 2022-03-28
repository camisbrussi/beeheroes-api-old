import { getRepository, Repository } from 'typeorm';

import { ICitiesRepository } from '@modules/addresses/repositories/ICitiesRepository';

import { City } from '../entities/City';

class CitiesRepository implements ICitiesRepository {
  private repository: Repository<City>

  constructor() {
    this.repository = getRepository(City);
  }

  async list(): Promise<City[]> {
    const role = await this.repository.find();
    return role;
  }
}

export { CitiesRepository };
