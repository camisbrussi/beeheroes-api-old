import { OccupationAreaRepositoryInMemory } from '@modules/volunteers/repositories/in-memory/OccupationAreaRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateOccupationAreaUseCase } from '../create/CreateUseCase';
import { UpdateOccupationAreaUseCase } from './UpdateUseCase';

let createOccupationAreaUseCase: CreateOccupationAreaUseCase;
let updateOccupationAreaUseCase: UpdateOccupationAreaUseCase;
let occupationAreaRepositoryInMemory: OccupationAreaRepositoryInMemory;

describe('Update Occupation Area', () => {
  beforeEach(() => {
    occupationAreaRepositoryInMemory = new OccupationAreaRepositoryInMemory();
    createOccupationAreaUseCase = new CreateOccupationAreaUseCase(
      occupationAreaRepositoryInMemory,
    );
    updateOccupationAreaUseCase = new UpdateOccupationAreaUseCase(occupationAreaRepositoryInMemory);
  });

  it('should be able to edit a occupation area', async () => {
    const occupationArea = await createOccupationAreaUseCase.execute({
      name: 'Occupation Area name',
    });

    const occupationAreaEdit = {
      id: occupationArea.id,
      name: 'Occupation Area name editado',
    };

    await updateOccupationAreaUseCase.execute(occupationAreaEdit);

    const occupationAreaEdited = await occupationAreaRepositoryInMemory
      .findByName(occupationAreaEdit.name);

    expect(occupationAreaEdited.name).toEqual(occupationAreaEdit.name);
  });

  it('should not be able to edit a occupation area with exists name', async () => {
    await expect(async () => {
      const occupationArea = await createOccupationAreaUseCase.execute({
        name: 'Occupation Area name',
      });

      await createOccupationAreaUseCase.execute({
        name: 'Occupation Area name2',
      });

      const occupationAreaEdit = {
        id: occupationArea.id,
        name: 'Occupation Area name',
        description: 'Occupation Area name2',
      };
      await updateOccupationAreaUseCase.execute(occupationAreaEdit);
    }).rejects.toEqual(new AppError('Occupation area already exists!'));
  });
});
