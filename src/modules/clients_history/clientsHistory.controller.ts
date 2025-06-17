import { Controller } from "@nestjs/common";
import { ClientsHistoryService } from "./clientsHistory.service";

@Controller("clients-history")
export class ClientsHistoryController {
    constructor(
        private readonly clientsHistoryService: ClientsHistoryService
    ) { }
}