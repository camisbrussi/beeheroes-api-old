import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { City } from './City';

@Entity('addresses')
class Address {
  @PrimaryColumn()
  id: string

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  complement: string;

  @Column()
  district: string;

  @Column()
  cep: number;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @Column()
  city_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Address };
