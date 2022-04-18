import { IEvaluationDTO } from '../dtos/IEvaluationDTO';
import { Evaluation } from '../infra/typeorm/entities/Evaluation';

interface IEvaluationsRepository{
  create({
    score,
    description,
    subscription_id,
  }: IEvaluationDTO): Promise<Evaluation>;
  findBySubscriptionId(subscription_id: string): Promise<Evaluation[]>;
  findById(id: string): Promise<Evaluation>;
  findByUserId(user_id: string): Promise<Evaluation[]>;
  update({
    id,
    score,
    description,
  }: IEvaluationDTO): Promise<Evaluation>;
}

export { IEvaluationsRepository };
