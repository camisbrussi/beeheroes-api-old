import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeletePermissionUseCase } from './DeleteUseCase';

class DeletePermissionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;

    const deletePermissionUseCase = container.resolve(DeletePermissionUseCase);

    const permission = await deletePermissionUseCase.execute(id);

    return response.status(200).json(permission);
  }
}

export { DeletePermissionController };
