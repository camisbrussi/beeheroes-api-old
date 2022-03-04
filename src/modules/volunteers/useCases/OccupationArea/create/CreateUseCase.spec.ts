import { OccupationsAreaRepositoryInMemory } from '@modules/volunteers/repositories/in-memory/OccupationAreaRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateOccupationAreaUseCase } from './CreateUseCase';

let createOccupationAreaUseCase: CreateOccupationAreaUseCase;
let occupationAreaRepositoryInMemory: OccupationsAreaRepositoryInMemory;

describe('Create OccupationArea', () => {
  beforeEach(() => {
    occupationAreaRepositoryInMemory = new OccupationsAreaRepositoryInMemory();
    createOccupationAreaUseCase = new CreateOccupationAreaUseCase(
      occupationAreaRepositoryInMemory,
    );
  });
  it('should be able to create a new occupation area', async () => {
    const occupationArea = {
      name: 'OccupationArea name',
    };

    await createOccupationAreaUseCase.execute(occupationArea);

    const occupationAreaCreated = await occupationAreaRepositoryInMemory
      .findByName(occupationArea.name);

    expect(occupationAreaCreated).toHaveProperty('id');
  });

  it('should not be able to create a occupation area if exists name', async () => {
    await expect(async () => {
      await createOccupationAreaUseCase.execute({
        name: 'Occupation Area',
      });

      await createOccupationAreaUseCase.execute({
        name: 'Occupation Area',
      });
    }).rejects.toEqual(new AppError('Occupation Area already exists!'));
  });
});
