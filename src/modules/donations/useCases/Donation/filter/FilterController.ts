import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FilterDonationUseCase } from './FilterUseCase';

class FilterDonationController {
  async handle(request: Request, response: Response): Promise<Response> {
    // const user = await userPermissions(request);

    // const hasAllPermissions = validateUserPermissions({
    //   user,
    //   permissions: ['donation.list'],
    //   roles: ['administrator', 'responsible'],
    // });

    // if (!hasAllPermissions) {
    //   throw new AppError('User without permission!', 401);
    // }

    const { query } = request.body;

    const filter = {
      name: query.name,
      start: query.status,
      organization_id: query.organization_id,
      status: Number(query.status),
      city_id: Number(query.city_id),
      state_id: Number(query.state_id),
    };

    const filterDonationUseCase = container.resolve(FilterDonationUseCase);

    const donation = await filterDonationUseCase.execute(filter);

    return response.status(200).json(donation);
  }
}

export { FilterDonationController };
