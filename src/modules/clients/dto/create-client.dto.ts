export class CreateClientDto {
    nombre: string;
    apellido: string;
    email: string;
    cel: string;
    dni: string;
    cuit: string;
    codigo_holistor: number;
    fecha_nacimiento?: Date;
    direccion?: string;
    localidad?: string;
    provincia?: string;
    codigo_postal?: string;
    active?: boolean = true;
    createdAt?: Date = new Date();
}
