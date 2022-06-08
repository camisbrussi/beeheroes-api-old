import { OccupationsAreaRepositoryInMemory } from '@modules/accounts/repositories/in-memory/OccupationAreaRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateOccupationAreaUseCase } from './CreateUseCase';

let createOccupationAreaUseCase: CreateOccupationAreaUseCase;
let occupationAreaRepositoryInMemory: OccupationsAreaRepositoryInMemory;

describe('Create OccupationArea', () => {
  beforeEach(() => {
    occupationAreaRepositoryInMemory = new OccupationsAreaRepositoryInMemory();
    createOccupationAreaUseCase = new CreateOccupationAreaUseCase(occupationAreaRepositoryInMemory);
  });
  it('should be able to create a new occupation area', async () => {
    const occupationArea = {
      id: 1,
      name: 'OccupationArea name',
    };

    await createOccupationAreaUseCase.execute(occupationArea);

    const occupationAreaCreated = await occupationAreaRepositoryInMemory
      .findByName(occupationArea.name);

    expect(occupationAreaCreated.name).toEqual('OccupationArea name');
  });

  it('should not be able to create a occupation area if exists name', async () => {
    await expect(async () => {
      await createOccupationAreaUseCase.execute({
        id: 2,
        name: 'Occupation Area',
      });

      await createOccupationAreaUseCase.execute({
        id: 3,
        name: 'Occupation Area',
      });
    }).rejects.toEqual(new AppError('Occupation Area already exists!'));
  });
});
