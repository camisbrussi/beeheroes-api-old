import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListPermissionUseCase } from './LisUseCase';

class ListPermissionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listPermissionsUseCase = container.resolve(ListPermissionUseCase);

    const all = await listPermissionsUseCase.execute();

    return response.json(all);
  }
}

export { ListPermissionController };
