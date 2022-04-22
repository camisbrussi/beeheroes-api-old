import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteOrganizationTypeUseCase } from './DeleteUseCase';

class DeleteOrganizationTypeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = Number(request.query.id);

    const deleteOrganizationTypeUseCase = container.resolve(DeleteOrganizationTypeUseCase);

    const organizationType = await deleteOrganizationTypeUseCase.execute(id);

    return response.status(200).json(organizationType);
  }
}

export { DeleteOrganizationTypeController };
