import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { CreateOrganizationUserUseCase } from './CreateUseCase';

class CreateOrganizationUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;
    const { users_id } = request.body;

    const createOrganizationUserUseCase = container.resolve(CreateOrganizationUserUseCase);

    const organizations = await createOrganizationUserUseCase.execute({
      organization_id: id,
      users_id,
    });

    return response.json(organizations);
  }
}

export { CreateOrganizationUserController };
