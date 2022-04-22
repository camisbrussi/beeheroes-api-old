import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateOrganizationTypeUseCase } from './UpdateUseCase';

class UpdateOrganizationTypeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const id = Number(request.query.id);

    const updateOrganizationTypeUseCase = container.resolve(UpdateOrganizationTypeUseCase);

    const organizationType = await updateOrganizationTypeUseCase.execute({
      id,
      name,
    });

    return response.status(200).json(organizationType);
  }
}

export { UpdateOrganizationTypeController };
