import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Res } from "@nestjs/common";
import { CajaService } from "./caja.service";
import { Response } from "express";
import { Caja } from "./entities/caja.entity";

@Controller('caja')
export class CajaController {
    constructor(
        private readonly cajaService: CajaService
    ) { }
    @Get()
    async getAllCajas(@Res() res: Response) {
        try {
            const cajas = await this.cajaService.getAllCajas();
            return res.status(200).json(cajas);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    @Get(':id')
    async getCajaById(
        @Res() res: Response,
        @Param('id', ParseUUIDPipe) id: string
    ) {
        try {
            const caja = await this.cajaService.getCajaById(id);
            return res.status(200).json(caja);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    @Post()
    async createCaja(
        @Res() res: Response,
        @Body() caja: Partial<Caja>
    ) {
        try {
            const newCaja = await this.cajaService.createCaja(caja);
            return res.status(201).json(newCaja);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async updateCaja(
        @Res() res: Response,
        @Param('id', ParseUUIDPipe) id: string,
        @Body() caja: Partial<Caja>
    ) {
        try {
            const updatedCaja = await this.cajaService.updateCaja(id, caja);
            return res.status(200).json(updatedCaja);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async deleteCaja(
        @Res() res: Response,
        @Param('id', ParseUUIDPipe) id: string
    ) {
        try {
            await this.cajaService.deleteCaja(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}