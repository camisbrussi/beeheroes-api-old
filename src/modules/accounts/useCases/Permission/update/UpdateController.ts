import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdatePermissionUseCase } from './UpdateUseCase';

class UpdatePermissionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const id = request.query.id as string;

    const updatePermissionUseCase = container.resolve(UpdatePermissionUseCase);

    const permission = await updatePermissionUseCase.execute({
      id,
      name,
      description,
    });

    return response.status(200).json(permission);
  }
}

export { UpdatePermissionController };
