

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { UserType } from './UserTypes';

@Entity('users')
class User{
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => UserType)
  @JoinColumn({ name: 'user_type_id' })
  userType: UserType;

  @Column()
  user_type_id: string;

  @Column()
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if(!this.id){
      this.id = uuidV4();
      this.status = true;
    }
  }
}

export { User };