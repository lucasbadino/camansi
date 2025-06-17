import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientsHistory } from "./entities/clientsHistory.entity";
import { ClientsHistoryService } from "./clientsHistory.service";
import { ClientsHistoryController } from "./clientsHistory.controller";

@Module({
    imports: [TypeOrmModule.forFeature([ClientsHistory])],
    controllers: [ClientsHistoryController],
    providers: [ClientsHistoryService],
})
export class ClientsHistoryModule { }