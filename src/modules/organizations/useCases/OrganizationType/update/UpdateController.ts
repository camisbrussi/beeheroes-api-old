import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateOrganizationTypeUseCase } from './UpdateUseCase';


class UpdateOrganizationTypeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const id = request.query.id as string;
    
    const updateOrganizationTypeUseCase = container.resolve(UpdateOrganizationTypeUseCase);

    const organizationType = await updateOrganizationTypeUseCase.execute({
      id,
      name, 
      description
    });

    return response.status(200).json(organizationType);
  }
}

export { UpdateOrganizationTypeController };