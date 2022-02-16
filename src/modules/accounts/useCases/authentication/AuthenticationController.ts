import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticationUseCase } from './AuthenticationUseCase';

class AuthenticationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const authenticationUseCase = container.resolve(AuthenticationUseCase);

    const token = await authenticationUseCase.execute({ password, email });

    return response.json(token);
  }
}

export { AuthenticationController };
