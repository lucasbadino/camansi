import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
@Entity(
    'users',
)
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid();
    @Column()
    nombre: string;
    @Column()
    apellido: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    cel: string;
    @Column()
    dni: string;
    @Column()
    cuit: string;
    
}
