import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateOccupationAreaUseCase } from './CreateUseCase';

class CreateOccupationAreaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createOccupationAreaUseCase = container.resolve(CreateOccupationAreaUseCase);

    const occupationArea = await createOccupationAreaUseCase.execute({ name, description });

    return response.status(201).send(JSON.stringify(occupationArea));
  }
}

export { CreateOccupationAreaController };
