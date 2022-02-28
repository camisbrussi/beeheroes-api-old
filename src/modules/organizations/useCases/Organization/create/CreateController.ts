import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateOrganizationUseCase } from './CreateUseCase';

class CreateOrganizationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      description,
      cnpj,
      organization_type_id,
      users,
    } = request.body;

    const createOrganizationUseCase = container.resolve(CreateOrganizationUseCase);

    const organization = await createOrganizationUseCase.execute({
      name,
      email,
      description,
      cnpj,
      organization_type_id,
      users,
    });

    return response.status(201).send(JSON.stringify(organization));
  }
}

export { CreateOrganizationController };
