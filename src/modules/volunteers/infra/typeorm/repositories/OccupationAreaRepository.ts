import { getRepository, Repository } from 'typeorm';

import { IOccupationAreaDTO } from '@modules/volunteers/dtos/IOccupationAreaDTO';
import { IOccupationAreaRepository } from '@modules/volunteers/repositories/IOccupationAreaRepository';

import { OccupationArea } from '../entities/Occupation_area';

class OccupationAreaRepository implements IOccupationAreaRepository {
  private repository: Repository<OccupationArea>

  constructor() {
    this.repository = getRepository(OccupationArea);
  }

  async create({ name }: IOccupationAreaDTO): Promise<OccupationArea> {
    const occupationArea = this.repository.create({
      name,
    });
    await this.repository.save(occupationArea);

    return occupationArea;
  }

  async list(): Promise<OccupationArea[]> {
    const occupationArea = await this.repository.find();
    return occupationArea;
  }

  async findByName(name: string): Promise<OccupationArea> {
    const occupationArea = await this.repository.findOne({ name });
    return occupationArea;
  }

  async findById(id: string): Promise<OccupationArea> {
    const occupationArea = await this.repository.findOne({ id });
    return occupationArea;
  }

  async update({ id, name }: IOccupationAreaDTO): Promise<OccupationArea> {
    const setOccupationArea: IOccupationAreaDTO = {};

    if (name) setOccupationArea.name = name;

    const occupationAreaEdited = await this.repository
      .createQueryBuilder()
      .update()
      .set(setOccupationArea)
      .where('id = :id')
      .setParameters({ id })
      .execute();

    return occupationAreaEdited.raw;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { OccupationAreaRepository };
