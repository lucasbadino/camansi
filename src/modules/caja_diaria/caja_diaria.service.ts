import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CajaDiariaEntity } from "./entities/caja_diaria.entity";
import { Repository } from "typeorm";

@Injectable()
export class CajaDiariaService {
    constructor(
        @InjectRepository(CajaDiariaEntity)
        private readonly cajaDiariaRepository: Repository<CajaDiariaEntity>,
    ) { }
    async getAllCajasDiarias() {
        const cajasDiarias = await this.cajaDiariaRepository.find();
        if (!cajasDiarias) {
            throw new NotFoundException("No se encontraron cajas diarias");
        }
        return cajasDiarias;
    }
    async getCajaDiariaById(id: string) {
        const cajaDiaria = await this.cajaDiariaRepository.findOneBy({ id });
        if (!cajaDiaria) {
            throw new NotFoundException(`Caja diaria with id ${id} not found`);
        }
        return cajaDiaria;
    }
    async createCajaDiaria(cajaDiaria: Partial<CajaDiariaEntity>) {
        if (!cajaDiaria) {
            throw new NotFoundException("Caja diaria data is required");
        }
        return this.cajaDiariaRepository.save(cajaDiaria);
    }
    async updateCajaDiaria(id: string, cajaDiaria: Partial<CajaDiariaEntity>) {
        const existingCajaDiaria = await this.cajaDiariaRepository.findOneBy({ id });
        if (!existingCajaDiaria) {
            throw new NotFoundException(`Caja diaria with ID ${id} not found`);
        }
        return this.cajaDiariaRepository.save({ ...existingCajaDiaria, ...cajaDiaria });
    }
    async deleteCajaDiaria(id: string) {
        const existingCajaDiaria = await this.cajaDiariaRepository.findOneBy({ id });
        if (!existingCajaDiaria) {
            throw new NotFoundException(`Caja diaria with ID ${id} not found`);
        }
        return this.cajaDiariaRepository.remove(existingCajaDiaria);
    }
}