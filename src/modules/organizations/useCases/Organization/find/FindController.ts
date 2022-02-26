import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindOrganizationUseCase } from './FindUseCase';

class FindOrganizationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;

    const findOrganizationUseCase = container.resolve(FindOrganizationUseCase);

    const organization = await findOrganizationUseCase.execute(id);

    return response.status(200).json(organization);
  }
}

export { FindOrganizationController };
