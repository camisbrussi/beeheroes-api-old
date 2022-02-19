import { UserTypeRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserTypesRepositoryInMemory';
import { ListUserTypesUseCase } from './ListUserTypeUseCase'


let listUsersTypeUseCase: ListUserTypesUseCase;
let userTypesRepositoryInMemory: UserTypeRepositoryInMemory;

describe('List Users Type', () => {
  beforeEach(() => {
    userTypesRepositoryInMemory = new UserTypeRepositoryInMemory();
    listUsersTypeUseCase = new ListUserTypesUseCase(userTypesRepositoryInMemory);
  });

  it('should be abe to list all user typess', async () => {
    const userType = await userTypesRepositoryInMemory.create({
      name: 'User Types',
      description: 'User Types Description',
    });

    const userTypes = await listUsersTypeUseCase.execute();

    expect(userTypes).toEqual([userType])
  });
})