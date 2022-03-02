import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindUserTypeUseCase } from './FindUseCase';

class FindUserTypeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    const findUserTypeUseCase = container.resolve(FindUserTypeUseCase);

    const userType = await findUserTypeUseCase.execute(Number(id));

    return response.status(200).json(userType);
  }
}

export { FindUserTypeController };
