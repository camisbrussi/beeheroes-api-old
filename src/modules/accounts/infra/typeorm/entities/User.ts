import { Expose } from 'class-transformer';
import {
  Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Role } from './Role';

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

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'roles_users',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }],
  })

  roles: Role[];

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
