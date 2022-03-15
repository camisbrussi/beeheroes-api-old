import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { CreateUserRoleUseCase } from './CreateUseCase';

class CreateUserRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;
    const { roles_id } = request.body;

    const createUserRoleUseCase = container.resolve(CreateUserRoleUseCase);

    const organizations = await createUserRoleUseCase.execute({
      user_id: id,
      roles_id,
    });

    return response.json(organizations);
  }
}

export { CreateUserRoleController };
