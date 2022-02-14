import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateEntityTypeUseCase } from './CreateEntityTypeUseCase'

class CreateEntityTypeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createEntityTypeUseCase = container.resolve(CreateEntityTypeUseCase);

    await createEntityTypeUseCase.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateEntityTypeController };