import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteRoleUseCase } from './DeleteUseCase';

class DeleteRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;

    const deleteRoleUseCase = container.resolve(DeleteRoleUseCase);

    const roles = await deleteRoleUseCase.execute(id);

    return response.status(200).json(roles);
  }
}

export { DeleteRoleController };
