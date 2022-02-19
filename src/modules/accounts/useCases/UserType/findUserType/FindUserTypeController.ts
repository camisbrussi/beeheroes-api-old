import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindUserTypeUseCase } from './FindUserTypeUseCase';


class FindUserTypeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;

    const findUserTypeUser = container.resolve(FindUserTypeUseCase);

    const userType = await findUserTypeUser.execute(id);

    return response.status(200).json(userType);
  }
}

export { FindUserTypeController };