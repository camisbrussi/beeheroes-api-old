import { IOccupationAreaDTO } from '@modules/volunteers/dtos/IOccupationAreaDTO';
import { OccupationArea } from '@modules/volunteers/infra/typeorm/entities/OccupationArea';

import { IOccupationsAreaRepository } from '../IOccupationsAreaRepository';

class OccupationsAreaRepositoryInMemory implements IOccupationsAreaRepository {
  occupationArea: OccupationArea[] = [];

  async create({
    name,
  }: IOccupationAreaDTO): Promise<OccupationArea> {
    const occupationAreas = new OccupationArea();

    const occupationArea = Object.assign(occupationAreas, {
      name,
    });

    this.occupationArea.push(occupationArea);

    return occupationArea;
  }

  async findByName(name: string): Promise<OccupationArea> {
    const occupationArea = this.occupationArea
      .find((occupationArea) => occupationArea.name === name);
    return occupationArea;
  }

  async findById(id: string): Promise<OccupationArea> {
    const occupationArea = this.occupationArea
      .find((occupationArea) => occupationArea.id === id);
    return occupationArea;
  }

  async list(): Promise<OccupationArea[]> {
    const all = this.occupationArea;
    return all;
  }

  async update({ id, name }: IOccupationAreaDTO): Promise<OccupationArea> {
    const findIndex = this.occupationArea
      .findIndex((occupationArea) => occupationArea.id === id);

    if (name) this.occupationArea[findIndex].name = name;

    return this.occupationArea[findIndex];
  }

  async delete(id: string): Promise<void> {
    const occupationArea = this.occupationArea.find((ut) => ut.id === id);
    this.occupationArea.splice(this.occupationArea.indexOf(occupationArea));
  }
}

export { OccupationsAreaRepositoryInMemory };
