import { IOccupationAreaDTO } from '../dtos/IOccupationAreaDTO';
import { OccupationArea } from '../infra/typeorm/entities/Occupation_area';

interface IOccupationAreaRepository {
  create({ name }: IOccupationAreaDTO): Promise<OccupationArea>;
  findByName(name: string): Promise<OccupationArea>;
  findById(id: string): Promise<OccupationArea>;
  list(): Promise<OccupationArea[]>;
  update({ id, name }: IOccupationAreaDTO): Promise<OccupationArea>
  delete(id: string): Promise<void>;
}

export { IOccupationAreaRepository };
