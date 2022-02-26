import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteUserTypeUseCase } from './DeleteUseCase';

class DeleteUserTypeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;
    
    const deleteUserTypeUseCase = container.resolve(DeleteUserTypeUseCase);

    const userType = await deleteUserTypeUseCase.execute(id);

    return response.status(200).json(userType);
  }
}

export { DeleteUserTypeController };