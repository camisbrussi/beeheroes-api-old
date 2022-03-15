import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { MeUseCase } from './MeUseCase';

class MeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { authorization } = request.headers;

    let authorizationToken;

    if (authorization) {
      [, authorizationToken] = authorization.split(' ');
    }

    const token = request.body.token || authorizationToken;

    const meUseCase = container.resolve(MeUseCase);

    const me = await meUseCase.execute(token);

    return response.json(me);
  }
}

export { MeController };
