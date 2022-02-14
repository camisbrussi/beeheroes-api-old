import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserTypeUseCase } from './CreateUserTypeUseCase'

class CreateUserTypeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createUserTypeUseCase = container.resolve(CreateUserTypeUseCase);

    await createUserTypeUseCase.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateUserTypeController };