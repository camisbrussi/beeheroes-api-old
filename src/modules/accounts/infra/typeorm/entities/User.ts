import { Expose } from 'class-transformer';
import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { UserType } from './UserTypes';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @ManyToOne(() => UserType)
  @JoinColumn({ name: 'user_type_id' })
  userType: UserType;

  @Column()
  user_type_id: number;

  @Column()
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  avatar_url(): string {
    return `local/avatar/${this.avatar}`;
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.status = Number(process.env.USER_STATUS_ACTIVE);
    }
  }
}

export { User };
