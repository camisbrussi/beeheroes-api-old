import { EntityTypeRepositoryInMemory } from '@modules/entities/repositories/in-memory/EntityTypesRepositoryInMemory';
import { CreateEntityTypeUseCase } from './CreateEntityTypeUseCase'
import {AppError} from '@shared/errors/AppError'

let createEntityTypeUseCase: CreateEntityTypeUseCase;
let entityTypesRepositoryInMemory: EntityTypeRepositoryInMemory;

describe("Create Entity Type", () => {

  beforeEach(() =>{
    entityTypesRepositoryInMemory = new EntityTypeRepositoryInMemory();
    createEntityTypeUseCase = new CreateEntityTypeUseCase(entityTypesRepositoryInMemory);
  })
  it("should be able to create a new entity type", async () => {
    await createEntityTypeUseCase.execute({
      name: "Entity Type name",
      description: "Entity type description"
    });
  });

  it("should not be able to create a entity type if exists name", () => {
    expect(async() => {
      await createEntityTypeUseCase.execute({
      name: "Entity Type",
      description: "Entity type description"
    });

      await createEntityTypeUseCase.execute({
      name: "Entity Type",
      description: "Entity type description"
    });
    }).rejects.toBeInstanceOf(AppError);
  })
})