import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Caja } from "./entities/caja.entity";
import { CajaController } from "./caja.controller";
import { CajaService } from "./caja.service";

@Module({
    imports: [TypeOrmModule.forFeature([Caja])],
    controllers: [CajaController],
    providers: [CajaService],
})
export class CajaModule { }