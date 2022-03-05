import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindDonationUseCase } from './FindUseCase';

class FindDonationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;

    const findDonationUseCase = container.resolve(FindDonationUseCase);

    const donation = await findDonationUseCase.execute(id);

    return response.status(200).json(donation);
  }
}

export { FindDonationController };
