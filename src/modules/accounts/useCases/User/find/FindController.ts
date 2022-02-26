import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindUserUseCase } from './FindUseCase';

class FindUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;

    const findUserUseCase = container.resolve(FindUserUseCase);

    const user = await findUserUseCase.execute(id);

    return response.status(200).json(user);
  }
}

export { FindUserController };
