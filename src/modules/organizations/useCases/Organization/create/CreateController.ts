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
      organization_type_id
    } = request.body;

    const createOrganizationUseCase = container.resolve(CreateOrganizationUseCase);

    const organization = await createOrganizationUseCase.execute({
      name,
      email,
      description,
      cnpj,
      organization_type_id
    });
      
    return response.status(201).send(JSON.stringify(organization));
  }
}

export { CreateOrganizationController }

