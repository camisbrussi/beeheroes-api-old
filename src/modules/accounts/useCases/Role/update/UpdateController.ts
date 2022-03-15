import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateRoleUseCase } from './UpdateUseCase';

class UpdateRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const id = request.query.id as string;

    const updateRoleUseCase = container.resolve(UpdateRoleUseCase);

    const role = await updateRoleUseCase.execute({
      id,
      name,
      description,
    });

    return response.status(200).json(role);
  }
}

export { UpdateRoleController };
