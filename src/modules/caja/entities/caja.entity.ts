import { CajaDiariaEntity } from "src/modules/caja_diaria/entities/caja_diaria.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Caja {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();
    @Column()
    fecha: Date = new Date();
    @OneToMany(() => CajaDiariaEntity, (cajaDiaria) => cajaDiaria.caja)
    cajaDiaria: CajaDiariaEntity[]
}