import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UserTypeRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserTypesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateUserUseCase } from '../../User/createUser/CreateUserUseCase';
import { CreateUserTypeUseCase } from '../createUserType/CreateUserTypeUseCase';
import { FindUserTypeUseCase } from '../findUserType/FindUserTypeUseCase';
import { DeleteUserTypeUseCase } from './DeleteUserTypeUseCase';

let createUserTypeUseCase: CreateUserTypeUseCase;
let createUserUseCase: CreateUserUseCase;
let deleteTypeUseCase: DeleteUserTypeUseCase;
let findUserTypeUseCase: FindUserTypeUseCase;
let userTypesRepositoryInMemory: UserTypeRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Update Type user', () => {
  beforeEach(() => {
    userTypesRepositoryInMemory = new UserTypeRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserTypeUseCase = new CreateUserTypeUseCase(userTypesRepositoryInMemory);
    deleteTypeUseCase = new DeleteUserTypeUseCase(
      usersRepositoryInMemory,
      userTypesRepositoryInMemory,
    );
    findUserTypeUseCase = new FindUserTypeUseCase(userTypesRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  });

   it("should be able to delete a user type", async () => {
    const userType = await createUserTypeUseCase.execute({
      name: "User Type name",
      description: "User type description" 
    });

    await deleteTypeUseCase.execute(userType.id);
    const typeUser = await findUserTypeUseCase.execute(userType.id);

    expect(typeUser).toBeUndefined();

  });

  it("should not be able to delete a user type in use", async () => {
    const userType = await createUserTypeUseCase.execute({
      name: "User Type name",
      description: "User type description" 
    });

    await createUserUseCase.execute({
      name: "User Type name",
      email: "teste@beeheroes.com",
      password: "123456",
      user_type_id: userType.id,
    });

    await expect (
      deleteTypeUseCase.execute(userType.id)
    ).rejects.toEqual(new AppError("User type is in use and can't deleted!"))

  });
})