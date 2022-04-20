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
      address_id,
      address,
      phones,
    } = request.body.data;
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
      address_id,
      address,
      phones,
    });

    return response.status(200).json(organization);
  }
}

export { UpdateOrganizationController };
