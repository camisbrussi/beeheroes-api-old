import { City } from '../infra/typeorm/entities/City';
import { State } from '../infra/typeorm/entities/State';

interface ICitiesRepository {
  listByState(id: number): Promise<City[]>;
  list(): Promise<State[]>;
}

export { ICitiesRepository };
