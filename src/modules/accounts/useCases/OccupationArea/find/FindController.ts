import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindOccupationAreaUseCase } from './FindUseCase';

class FindOccupationAreaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = Number(request.query.id);

    const findOccupationAreaUseCase = container.resolve(FindOccupationAreaUseCase);

    const occupationArea = await findOccupationAreaUseCase.execute(id);

    return response.status(200).json(occupationArea);
  }
}

export { FindOccupationAreaController };
