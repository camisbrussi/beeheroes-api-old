import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListDonationsUseCase } from './ListUseCase';

class ListDonationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listDonationsUseCase = container.resolve(ListDonationsUseCase);

    const all = await listDonationsUseCase.execute();

    return response.json(all);
  }
}

export { ListDonationController };
