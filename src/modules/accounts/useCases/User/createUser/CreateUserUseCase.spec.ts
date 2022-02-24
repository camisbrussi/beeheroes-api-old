import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateUserUseCase } from './CreateUserUseCase';


let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

beforeEach(() => {
  usersRepositoryInMemory = new UsersRepositoryInMemory();
  createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
});


describe('Create User ', () => {
  it('should be able to create a new user ', async() => {
    const user = {
      name: 'Admin',
      email: 'admin@beeheroes.com',
      password: '123456',
      user_type_id: 'admin'
    };

    await createUserUseCase.execute(user);

    const userCreated = await usersRepositoryInMemory.findByEmail(user.email);
    expect(userCreated).toHaveProperty('id');
  });

  it('should not be able to create a new  with email exists', async () => {
    const user = {
      name: 'Name test',
      email: 'teste@beeheroes.com',
      password: '123456',
      user_type_id: 'admin'
    };

    await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password,
      user_type_id: 'admin',
    });

    await expect(
      createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password,
      user_type_id: 'admin'
    }),
    ).rejects.toEqual(new AppError(`User ${user.email} already exists`));
  });

  it('should not be able to create a user  with available true by default', async () =>{
     const user = await createUserUseCase.execute({
      name: 'Admin',
      email: 'admin@beeheroes.com',
      password: '123456',
      user_type_id: 'admin'
    });

    expect(user.status).toBe(Number(process.env.USER_STATUS_ACTIVE));
  })
})