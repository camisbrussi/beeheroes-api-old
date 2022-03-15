import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { userPermissions } from '@utils/userPermissions';
import { validateUserPermissions } from '@utils/validateUserPermissions';

import { CreatePermissionUseCase } from './CreateUseCase';

class CreatePermissionController {
  async handle(request: Request, response: Response): Promise<Response> {
    // const user = await userPermissions(request);

    // const hasAllPermissions = validateUserPermissions({
    //   user,
    //   roles: ['administrator'],
    // });

    // if (!hasAllPermissions) {
    //   throw new AppError('User without permission!', 401);
    // }
    const { name, description } = request.body;

    const createPermissionUseCase = container.resolve(CreatePermissionUseCase);

    const typeUser = await createPermissionUseCase.execute({ name, description });

    return response.status(201).send(JSON.stringify(typeUser));
  }
}

export { CreatePermissionController };
