import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CajaDiariaEntity } from "./entities/caja_diaria.entity";
import { CajaDiariaController } from "./caja_diaria.controller";
import { CajaDiariaService } from "./caja_diaria.service";

@Module({
    imports: [TypeOrmModule.forFeature([CajaDiariaEntity])],
    controllers: [CajaDiariaController],
    providers: [CajaDiariaService],
    exports: []
})
export class CajaDiariaModule { }