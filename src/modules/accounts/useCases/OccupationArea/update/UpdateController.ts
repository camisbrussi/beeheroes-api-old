import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateOccupationAreaUseCase } from './UpdateUseCase';

class UpdateOccupationAreaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const id = Number(request.query.id);

    const updateOccupationAreaUseCase = container.resolve(UpdateOccupationAreaUseCase);

    const occupationArea = await updateOccupationAreaUseCase.execute({
      id,
      name,
    });

    return response.status(200).json(occupationArea);
  }
}

export { UpdateOccupationAreaController };
