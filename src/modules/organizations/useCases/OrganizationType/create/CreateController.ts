import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateOrganizationTypeUseCase } from './CreateUseCase'

class CreateOrganizationTypeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createOrganizationTypeUseCase = container.resolve(CreateOrganizationTypeUseCase);

    const typeOrganization = await createOrganizationTypeUseCase.execute({ name, description });

    return response.status(201).send(JSON.stringify(typeOrganization));
  }
}

export { CreateOrganizationTypeController };