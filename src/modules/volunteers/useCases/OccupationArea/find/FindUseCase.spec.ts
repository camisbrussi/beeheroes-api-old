import { OccupationsAreaRepositoryInMemory } from '@modules/volunteers/repositories/in-memory/OccupationAreaRepositoryInMemory';

import { FindOccupationAreaUseCase } from './FindUseCase';

let findOccupationAreaUseCase: FindOccupationAreaUseCase;
let occupationAreaRepositoryInMemory: OccupationsAreaRepositoryInMemory;

describe('List OccupationArea ', () => {
  beforeEach(() => {
    occupationAreaRepositoryInMemory = new OccupationsAreaRepositoryInMemory();
    findOccupationAreaUseCase = new FindOccupationAreaUseCase(occupationAreaRepositoryInMemory);
  });

  it('should be abe to find occupationArea for id', async () => {
    const occupationArea = {
      name: 'OccupationArea',
    };

    const { id } = await occupationAreaRepositoryInMemory.create(occupationArea);

    const findOccupationArea = await findOccupationAreaUseCase.execute(id);

    expect(findOccupationArea.id).toEqual(id);
  });
});
