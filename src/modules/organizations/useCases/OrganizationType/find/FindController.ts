import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindOrganizationTypeUseCase } from './FindUseCase';

class FindOrganizationTypeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = Number(request.query.id);

    const findOrganizationTypeUseCase = container.resolve(FindOrganizationTypeUseCase);

    const organizationType = await findOrganizationTypeUseCase.execute(id);

    return response.status(200).json(organizationType);
  }
}

export { FindOrganizationTypeController };
