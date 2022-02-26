import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateOrganizationUseCase } from './UpdateUseCase';

class UpdateOrganizationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      description,
      cnpj,
      organization_type_id,
      status,
    } = request.body;
    const id = request.query.id as string;

    const updateOrganizationUseCase = container.resolve(UpdateOrganizationUseCase);

    const organization = await updateOrganizationUseCase.execute({
      id,
      name,
      email,
      description,
      cnpj,
      organization_type_id,
      status,
    });

    return response.status(200).json(organization);
  }
}

export { UpdateOrganizationController };
