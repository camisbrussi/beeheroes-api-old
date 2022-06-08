import { OccupationsAreaRepositoryInMemory } from '@modules/accounts/repositories/in-memory/OccupationAreaRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateOccupationAreaUseCase } from '../create/CreateUseCase';
import { UpdateOccupationAreaUseCase } from './UpdateUseCase';

let createOccupationAreaUseCase: CreateOccupationAreaUseCase;
let updateOccupationAreaUseCase: UpdateOccupationAreaUseCase;
let occupationAreaRepositoryInMemory: OccupationsAreaRepositoryInMemory;

describe('Update Occupation Area', () => {
  beforeEach(() => {
    occupationAreaRepositoryInMemory = new OccupationsAreaRepositoryInMemory();
    createOccupationAreaUseCase = new CreateOccupationAreaUseCase(
      occupationAreaRepositoryInMemory,
    );
    updateOccupationAreaUseCase = new UpdateOccupationAreaUseCase(occupationAreaRepositoryInMemory);
  });

  it('should be able to edit a occupation area', async () => {
    await createOccupationAreaUseCase.execute({
      id: 1,
      name: 'Occupation Area name',
    });

    const occupationAreaEdit = {
      id: 1,
      name: 'Occupation Area name editado',
    };

    await updateOccupationAreaUseCase.execute(occupationAreaEdit);

    const occupationAreaEdited = await occupationAreaRepositoryInMemory
      .findByName(occupationAreaEdit.name);

    expect(occupationAreaEdited.name).toEqual(occupationAreaEdit.name);
  });

  it('should not be able to edit a occupation area with exists name', async () => {
    await expect(async () => {
      await createOccupationAreaUseCase.execute({
        id: 2,
        name: 'Occupation Area name',
      });

      await createOccupationAreaUseCase.execute({
        id: 3,
        name: 'Occupation Area name2',
      });

      const occupationAreaEdit = {
        id: 2,
        name: 'Occupation Area name',
        description: 'Occupation Area name2',
      };
      await updateOccupationAreaUseCase.execute(occupationAreaEdit);
    }).rejects.toEqual(new AppError('Occupation area already exists!'));
  });
});
