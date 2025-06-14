import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    nombre: string;
    @Column()
    apellido: string;
    @Column()
    email: string;
    @Column()
    cel: string;
    @Column()
    dni: string;
    @Column()
    cuit: string;
    @Column()
    codigo_holistor: number;
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
}
