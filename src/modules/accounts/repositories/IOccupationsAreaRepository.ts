import { IOccupationAreaDTO } from '../dtos/IOccupationAreaDTO';
import { OccupationArea } from '../infra/typeorm/entities/OccupationArea';

interface IOccupationsAreaRepository {
  create({ name }: IOccupationAreaDTO): Promise<OccupationArea>;
  findByName(name: string): Promise<OccupationArea>;
  findById(id: number): Promise<OccupationArea>;
  list(): Promise<OccupationArea[]>;
  update({ id, name }: IOccupationAreaDTO): Promise<OccupationArea>
  delete(id: number): Promise<void>;
}

export { IOccupationsAreaRepository };
