import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class ClientsCC {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();
  @Column({ nullable: true })
  fecha_alta: string;
  @Column({ nullable: true })
  fecha_baja: string;
  @Column({ nullable: true })
  iva: string;
  @Column({ nullable: true })
  tipo: string;
}
