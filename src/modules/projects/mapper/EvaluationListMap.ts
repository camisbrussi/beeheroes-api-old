import { instanceToInstance } from 'class-transformer';

type Evaluation = {
  id: string;
  score: number;
  description: string;
  organization:
  {
    name: string;
    avatar: string;
  }
}

class EvaluationListMap {
  static toDTO({
    id,
    score,
    description,
    organization,
  }: Evaluation) {
    const evaluation = instanceToInstance({
      id,
      score,
      description,
      organization,
    });
    return evaluation;
  }
}

export { EvaluationListMap };
