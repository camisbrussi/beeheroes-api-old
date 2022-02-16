import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { RefreshTokenUseCase } from './RefreshTokenUseCase';

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {

    const { authorization } = request.headers;

    let authorizationToken;

    if(authorization){
      [, authorizationToken] = authorization.split(' ');
    }

    const token = request.body.token || authorizationToken

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const refresh_token = await refreshTokenUseCase.execute(token);

    return response.json(refresh_token);
  }
}

export { RefreshTokenController };
