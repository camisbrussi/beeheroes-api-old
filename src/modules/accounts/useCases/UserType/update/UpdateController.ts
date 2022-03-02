import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserTypeUseCase } from './UpdateUseCase';

class UpdateUserTypeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const { id } = request.query;

    const updateUserTypeUseCase = container.resolve(UpdateUserTypeUseCase);

    const userType = await updateUserTypeUseCase.execute({
      id: Number(id),
      name,
      description,
    });

    return response.status(200).json(userType);
  }
}

export { UpdateUserTypeController };
