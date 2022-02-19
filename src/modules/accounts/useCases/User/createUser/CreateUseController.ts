import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      user_type_id
    } = request.body;


    const createUserUseCase = container.resolve(CreateUserUseCase);

   const user = await createUserUseCase.execute({
      name,
      email,
      password,
      user_type_id
    });
    
    return response.status(201).send(JSON.stringify(user));
  }
}

export { CreateUserController }

