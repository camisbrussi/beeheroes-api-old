import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { User } from '../../../../accounts/infra/typeorm/entities/User';
import { Project } from './Project';

@Entity('subscriptions')
class Subscription {
  @PrimaryColumn()
  id: string;

  @Column()
  registration_date: Date;

  @Column()
  participation_date: Date;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column()
  project_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

  @Column()
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.status = Number(process.env.SUBSCRIPTION_STATUS_AWAIT_AUTHORIZATION);
    }
  }
}

export { Subscription };
