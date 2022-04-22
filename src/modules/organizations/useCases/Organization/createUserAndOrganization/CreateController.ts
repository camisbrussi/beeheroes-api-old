import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserAndOrganizationUseCase } from './CreateUseCase';

class CreateUserAndOrganizationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      user,
      organization,
    } = request.body;

    const createUserAndOrganizationUseCase = container.resolve(CreateUserAndOrganizationUseCase);

    const newOrganization = await createUserAndOrganizationUseCase.execute({
      user,
      organization,
    });

    return response.status(201).send(JSON.stringify(newOrganization));
  }
}

export { CreateUserAndOrganizationController };
