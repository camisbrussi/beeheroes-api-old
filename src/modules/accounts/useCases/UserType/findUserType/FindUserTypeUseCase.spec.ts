import { UserTypeRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserTypesRepositoryInMemory'
import { FindUserTypeUseCase } from './FindUserTypeUseCase';


let findUsersTypeUseCase: FindUserTypeUseCase;
let userTypesRepositoryInMemory: UserTypeRepositoryInMemory;

describe('List Users Type', () => {
  beforeEach(() => {
    userTypesRepositoryInMemory = new UserTypeRepositoryInMemory();
    findUsersTypeUseCase = new FindUserTypeUseCase(userTypesRepositoryInMemory);
  });

    it('should be abe to find user types for id', async () => {
    const userType = {
      name: 'User Types',
      description: 'User Types Description',
    }
    
    const { id } = await userTypesRepositoryInMemory.create(userType);

    const userTypes = await findUsersTypeUseCase.execute(id);

    expect(userTypes.id).toEqual(id)
  });
})