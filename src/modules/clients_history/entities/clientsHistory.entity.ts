import { ClientsCC } from "src/modules/clients_CC/entities/clientsCC.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class ClientsHistory {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid();
    @Column({ nullable: true })
    fecha_alta: string;
    @Column({ nullable: true })
    fecha_baja: string;
    @Column({ nullable: true })
    tipo: string;
    @OneToMany(() => ClientsCC, (clientsCC) => clientsCC.clientsHistory)
    clientsCC: ClientsCC[];
}