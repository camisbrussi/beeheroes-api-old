import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindOrganizationUserUseCase } from './FindUseCase';

class FindOrganizationUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;

    const findOrganizationUseCase = container.resolve(FindOrganizationUserUseCase);

    const organization = await findOrganizationUseCase.execute(id);

    return response.status(200).json(organization);
  }
}

export { FindOrganizationUserController };
