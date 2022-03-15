import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindPermissionUseCase } from './FindUseCase';

class FindPermissionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;

    const findPermissionUseCase = container.resolve(FindPermissionUseCase);

    const permission = await findPermissionUseCase.execute(id);

    return response.status(200).json(permission);
  }
}

export { FindPermissionController };
