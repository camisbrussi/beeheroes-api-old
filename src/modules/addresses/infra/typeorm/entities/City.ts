import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';

import { State } from './State';

@Entity('cities')
class City {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => State)
  @JoinColumn({ name: 'state_id' })
  state: State;

  @Column()
  state_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { City };
