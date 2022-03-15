import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { CreateRolePermissionUseCase } from './CreateUseCase';

class CreateRolePermissionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;
    const { permissions_id } = request.body;

    const createPermissionUserUseCase = container.resolve(CreateRolePermissionUseCase);

    const organizations = await createPermissionUserUseCase.execute({
      role_id: id,
      permissions_id,
    });

    return response.json(organizations);
  }
}

export { CreateRolePermissionController };
