import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateOrganizationAvatarUseCase } from './UpdateOrganizationAvatarUseCase';

class UpdateOrganizationAvatarController {
  async handle(request:Request, response:Response): Promise<Response> {
    const id = request.query.id as string;
    const avatar_file = request.file.filename;

    const updateOrganizationAvatarUseCase = container.resolve(UpdateOrganizationAvatarUseCase);

    await updateOrganizationAvatarUseCase.execute({ organization_id: id, avatar_file });

    return response.status(204).send();
  }
}

export { UpdateOrganizationAvatarController };
