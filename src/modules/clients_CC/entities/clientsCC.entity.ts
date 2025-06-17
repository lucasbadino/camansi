import { ClientsHistory } from 'src/modules/clients_history/entities/clientsHistory.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class ClientsCC {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();
  @Column()
  fecha: Date = new Date();
  @Column()
  haber: number;
  @Column()
  deber: number;
  @Column()
  saldo: number;
  @Column()
  descuento_recargo: number;
  @ManyToOne(() => ClientsHistory, (clientsHistory) => clientsHistory.clientsCC)
  clientsHistory: ClientsHistory;
}
