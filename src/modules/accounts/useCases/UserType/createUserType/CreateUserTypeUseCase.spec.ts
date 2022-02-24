
import { CreateUserTypeUseCase } from './CreateUserTypeUseCase'
import {AppError} from '@shared/errors/AppError'
import { UserTypeRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserTypesRepositoryInMemory';

let createUserTypeUseCase: CreateUserTypeUseCase;
let userTypesRepositoryInMemory: UserTypeRepositoryInMemory;

describe("Create User Type", () => {

  beforeEach(() =>{
    userTypesRepositoryInMemory = new UserTypeRepositoryInMemory();
    createUserTypeUseCase = new CreateUserTypeUseCase(userTypesRepositoryInMemory);
  })
  it("should be able to create a new user type", async () => {
    const userType = {
      name: "User Type name",
      description: "User type description" 
    }
    
    await createUserTypeUseCase.execute(userType);

    const userTypeCreated = await userTypesRepositoryInMemory.findByName(userType.name);

    expect(userTypeCreated).toHaveProperty('id');
  });

  it("should not be able to create a user type if exists name", async () => {
    await expect(async() => {
      await createUserTypeUseCase.execute({
      name: "User Type",
      description: "User type description"
    });

      await createUserTypeUseCase.execute({
      name: "User Type",
      description: "User type description"
    });
    }).rejects.toEqual(new AppError('User type already exists!'));
  })
})