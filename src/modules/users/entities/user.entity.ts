import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();
  @Column()
  nombre: string;
  @Column()
  apellido: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column(
    { nullable: true }, // Optional field, can be null
  )
  cel: string;
  @Column({ nullable: true }) // Optional field, can be null
  dni: string;
  @Column({ nullable: true }) // Optional field, can be null
  cuit: string;
  @Column()
  rol: string; // 'admin' | 'user'
  @Column()
  active: boolean = true;
}
