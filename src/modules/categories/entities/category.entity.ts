import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();
  @Column()
  type: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  price: number;
  @Column({ nullable: true })
  frecuency: string;
}
