import { OccupationAreaRepositoryInMemory } from '@modules/volunteers/repositories/in-memory/OccupationAreaRepositoryInMemory';

import { ListOccupationAreaUseCase } from './LisUseCase';

let listOccupationAreaUseCase: ListOccupationAreaUseCase;
let occupationAreaRepositoryInMemory: OccupationAreaRepositoryInMemory;

describe('List Organizations Type', () => {
  beforeEach(() => {
    occupationAreaRepositoryInMemory = new OccupationAreaRepositoryInMemory();
    listOccupationAreaUseCase = new ListOccupationAreaUseCase(
      occupationAreaRepositoryInMemory,
    );
  });

  it('should be abe to list all Occupation Area typess', async () => {
    const occupationArea = await occupationAreaRepositoryInMemory.create({
      name: 'Occupation Area',
    });

    const listOccupationArea = await listOccupationAreaUseCase.execute();

    expect(listOccupationArea).toEqual([occupationArea]);
  });
});
