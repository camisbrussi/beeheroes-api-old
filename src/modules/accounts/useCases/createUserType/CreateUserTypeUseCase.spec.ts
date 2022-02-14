
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
    await createUserTypeUseCase.execute({
      name: "User Type name",
      description: "User type description"
    });
  });

  it("should not be able to create a user type if exists name", () => {
    expect(async() => {
      await createUserTypeUseCase.execute({
      name: "User Type",
      description: "User type description"
    });

      await createUserTypeUseCase.execute({
      name: "User Type",
      description: "User type description"
    });
    }).rejects.toBeInstanceOf(AppError);
  })
})