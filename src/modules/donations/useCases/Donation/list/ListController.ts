import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { userPermissions } from '@utils/userPermissions';
import { validateUserPermissions } from '@utils/validateUserPermissions';

import { ListDonationsUseCase } from './ListUseCase';

class ListDonationController {
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

    const listDonationsUseCase = container.resolve(ListDonationsUseCase);

    const all = await listDonationsUseCase.execute();

    return response.json(all);
  }
}

export { ListDonationController };
