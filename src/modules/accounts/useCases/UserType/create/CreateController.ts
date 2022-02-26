import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserTypeUseCase } from './CreateUseCase'

class CreateUserTypeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createUserTypeUseCase = container.resolve(CreateUserTypeUseCase);

    const typeUser = await createUserTypeUseCase.execute({ name, description });

    return response.status(201).send(JSON.stringify(typeUser));
  }
}

export { CreateUserTypeController };