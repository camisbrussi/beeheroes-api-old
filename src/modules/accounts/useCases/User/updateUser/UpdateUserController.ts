import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserUseCase } from './UpdateUserUseCase';


class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password, email, user_type_id } = request.body;
    const id = request.query.id as string;
    
    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const user = await updateUserUseCase.execute({
      id, 
      name, 
      password, 
      email, 
      user_type_id
    });

    return response.status(200).json(user);
  }
}

export { UpdateUserController };