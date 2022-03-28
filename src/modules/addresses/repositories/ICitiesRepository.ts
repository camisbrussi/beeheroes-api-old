import { City } from '../infra/typeorm/entities/City';

interface ICitiesRepository {
  list(): Promise<City[]>;
}

export { ICitiesRepository };
