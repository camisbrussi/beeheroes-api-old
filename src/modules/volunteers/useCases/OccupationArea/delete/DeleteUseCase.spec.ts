import { OccupationsAreaRepositoryInMemory } from '@modules/volunteers/repositories/in-memory/OccupationAreaRepositoryInMemory';
import { VolunteersRepositoryInMemory } from '@modules/volunteers/repositories/in-memory/VolunteersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateOccupationAreaUseCase } from '../create/CreateUseCase';
import { FindOccupationAreaUseCase } from '../find/FindUseCase';
import { DeleteOccupationAreaUseCase } from './DeleteUseCase';

let createOccupationAreaUseCase: CreateOccupationAreaUseCase;
let deleteOccupationAreaUseCase: DeleteOccupationAreaUseCase;
let findOccupationAreaUseCase: FindOccupationAreaUseCase;
let occupationAreaRepositoryInMemory: OccupationsAreaRepositoryInMemory;
let volunteersRepositoryInMemory: VolunteersRepositoryInMemory;

describe('Update Occupation Area', () => {
  beforeEach(() => {
    occupationAreaRepositoryInMemory = new OccupationsAreaRepositoryInMemory();
    volunteersRepositoryInMemory = new VolunteersRepositoryInMemory();
    createOccupationAreaUseCase = new CreateOccupationAreaUseCase(
      occupationAreaRepositoryInMemory,
    );
    deleteOccupationAreaUseCase = new DeleteOccupationAreaUseCase(
      volunteersRepositoryInMemory,
      occupationAreaRepositoryInMemory,
    );
    findOccupationAreaUseCase = new FindOccupationAreaUseCase(
      occupationAreaRepositoryInMemory,
    );
  });

  it('should be able to delete a occupation area', async () => {
    const occupationArea = await createOccupationAreaUseCase.execute({
      name: 'Occupation Area name',
    });

    await deleteOccupationAreaUseCase.execute(occupationArea.id);
    const occupationAreaVolunteer = await findOccupationAreaUseCase.execute(occupationArea.id);

    expect(occupationAreaVolunteer).toBeUndefined();
  });

  it('should not be able to delete a occupation area in use', async () => {
    const occupationArea = await createOccupationAreaUseCase.execute({
      name: 'Occupation Area name',
    });

    await volunteersRepositoryInMemory.create({
      cpf: '0000',
      profession: 'profession',
      description: 'xxxx',
      occupation_area_id: occupationArea.id,
      user_id: 'volunteer',
    });

    await expect(
      deleteOccupationAreaUseCase.execute(occupationArea.id),
    ).rejects.toEqual(new AppError("Occupation Area is in use and can't deleted!"));
  });
});
