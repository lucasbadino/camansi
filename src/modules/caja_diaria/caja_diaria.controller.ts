import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Res } from "@nestjs/common";
import { CajaDiariaService } from "./caja_diaria.service";
import { Response } from "express";
import { CajaDiariaEntity } from "./entities/caja_diaria.entity";

@Controller("caja_diaria")
export class CajaDiariaController {
    constructor(
        private readonly cajaDiariaService: CajaDiariaService

    ) { }
    @Get()
    getAllCajasDiarias(@Res() res: Response) {
        try {
            const cajasDiarias = this.cajaDiariaService.getAllCajasDiarias();
            return res.status(200).json(cajasDiarias);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    @Get(":id")
    getCajaDiariaById(
        @Res() res: Response,
        @Param('id', ParseUUIDPipe) id: string
    ) {
        try {
            const cajaDiaria = this.cajaDiariaService.getCajaDiariaById(id);
            return res.status(200).json(cajaDiaria);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    @Post()
    createCajaDiaria(
        @Res() res: Response,
        @Body() cajaDiaria: Partial<CajaDiariaEntity>
    ) {
        try {
            const newCajaDiaria = this.cajaDiariaService.createCajaDiaria(cajaDiaria);
            return res.status(201).json(newCajaDiaria);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    @Patch(":id")
    updateCajaDiaria(
        @Res() res: Response,
        @Param('id', ParseUUIDPipe) id: string,
        @Body() cajaDiaria: Partial<CajaDiariaEntity>
    ) {
        try {
            const updatedCajaDiaria = this.cajaDiariaService.updateCajaDiaria(id, cajaDiaria);
            return res.status(200).json(updatedCajaDiaria);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    @Delete(":id")
    deleteCajaDiaria(
        @Res() res: Response,
        @Param('id', ParseUUIDPipe) id: string
    ) {
        try {
            const deletedCajaDiaria = this.cajaDiariaService.deleteCajaDiaria(id);
            return res.status(200).json(deletedCajaDiaria);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

}