import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Caja } from "./entities/caja.entity";
import { Repository } from "typeorm";

@Injectable()
export class CajaService {
    constructor(
        @InjectRepository(Caja)
        private readonly cajaRepository: Repository<Caja>,
    ) { }
    async getAllCajas() {
        const cajas = await this.cajaRepository.find();
        if (cajas.length === 0) {
            throw new NotFoundException('No cajas found');
        }
        return cajas;
    }
    async getCajaById(id: string) {
        const caja = await this.cajaRepository.findOneBy({ id });
        if (!caja) {
            throw new NotFoundException(`Caja with id ${id} not found`);
        }
        return caja;
    }
    async createCaja(caja: Partial<Caja>) {
        if (!caja) {
            throw new NotFoundException("Caja data is required");
        }
        const existingCaja = await this.cajaRepository.findOne({ where: { id: caja.id } });
        if (existingCaja) {
            throw new NotFoundException(`Caja with ID ${caja.id} already exists`);
        }
        return this.cajaRepository.save(caja);
    }
    async updateCaja(id: string, caja: Partial<Caja>) {
        const existingCaja = await this.cajaRepository.findOne({ where: { id } });
        if (!existingCaja) {
            throw new NotFoundException(`Caja with ID ${id} not found`);
        }
        return this.cajaRepository.save({ ...existingCaja, ...caja });
    }
    async deleteCaja(id: string) {
        const existingCaja = await this.cajaRepository.findOne({ where: { id } });
        if (!existingCaja) {
            throw new NotFoundException(`Caja with ID ${id} not found`);
        }
        return this.cajaRepository.remove(existingCaja);
    }

}