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

    const filter = {
      name: request.body.name,
      start: request.body.status,
      organization_id: request.body.organization_id,
      status: request.body.status,
      city_id: request.body.city_id,
      state_id: request.body.state_id,
    };

    const filterDonationUseCase = container.resolve(FilterDonationUseCase);

    const donation = await filterDonationUseCase.execute(filter);

    return response.status(200).json(donation);
  }
}

export { FilterDonationController };
