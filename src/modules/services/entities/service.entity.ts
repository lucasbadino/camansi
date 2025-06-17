import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
@Entity()
export class ServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();
  @Column()
  name: string;
  @Column()
  description: string;
  @Column({ nullable: true })
  price: number;

  /* no frecuente a solicitud del cliente 
  carpeta del banco, contrato*/
}
