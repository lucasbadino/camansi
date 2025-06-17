import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { v4 as uuid } from 'uuid';
@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();
  @Column()
  nombre: string;
  @Column()
  apellido: string;
  @Column()
  email: string;
  @Column()
  cel: string;
  @Column(
    { nullable: true }, // Optional field, can be null
  )
  dni: string;
  @Column()
  cuit: string;
  @Column()
  codigo_holistor: number = 0; // Default value set to 0
  @Column({ nullable: true })
  fecha_nacimiento: Date;
  @Column({ nullable: true })
  direccion: string;
  @Column({ nullable: true })
  localidad: string;
  @Column({ nullable: true })
  provincia: string;
  @Column({ nullable: true })
  codigo_postal: string;
  @Column()
  active: boolean = true;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column()
  activity: string = 'Cliente'; // Default value set to 'Cliente'
}
