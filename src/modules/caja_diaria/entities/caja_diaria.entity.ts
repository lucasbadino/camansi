import { Caja } from "src/modules/caja/entities/caja.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class CajaDiariaEntity {
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
    @ManyToOne(() => Caja, (caja) => caja.cajaDiaria)
    caja: Caja
}