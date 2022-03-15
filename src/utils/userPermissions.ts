import { Request } from 'express';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IPermissionsResponse {
  roles: string[];
  permissions: string[];
}

export async function userPermissions(request: Request): Promise<IPermissionsResponse> {
  const { id } = request.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if (!user) {
    throw new AppError('Invalid token!', 401);
  }

  const roles = user.roles?.map((role) => role.name);
  const permissions = user.roles?.map(
    (role) => role.permissions?.map((permission) => permission.name),
  );

  return {
    roles,
    permissions: permissions ? permissions[0] : [],
  };
}
