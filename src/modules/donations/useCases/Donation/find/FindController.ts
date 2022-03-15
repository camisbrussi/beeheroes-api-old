import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { userPermissions } from '@utils/userPermissions';
import { validateUserPermissions } from '@utils/validateUserPermissions';

import { FindDonationUseCase } from './FindUseCase';

class FindDonationController {
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

    const id = request.query.id as string;

    const findDonationUseCase = container.resolve(FindDonationUseCase);

    const donation = await findDonationUseCase.execute(id);

    return response.status(200).json(donation);
  }
}

export { FindDonationController };
