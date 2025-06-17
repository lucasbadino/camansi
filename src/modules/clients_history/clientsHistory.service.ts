import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { ClientsHistory } from "./entities/clientsHistory.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ClientsHistoryService {
    constructor(
        @InjectRepository(ClientsHistory)
        private readonly clientsHistoryRepository: Repository<ClientsHistory>,
    ) { }

    async findAll(): Promise<ClientsHistory[]> {
        const clientsHistory = await this.clientsHistoryRepository.find();
        if (!clientsHistory || clientsHistory.length === 0) {
            throw new NotFoundException("No clients history found");
        }
        return clientsHistory;
    }
    async findOne(id: string): Promise<ClientsHistory> {
        const clientHistory = await this.clientsHistoryRepository.findOne({ where: { id } });
        if (!clientHistory) {
            throw new NotFoundException(`Client history with ID ${id} not found`);
        }
        return clientHistory;
    }
    async create(clientsHistory: Partial<ClientsHistory>) {
        if (!clientsHistory) {
            throw new NotFoundException("Client history data is required");
        }
        const existingClientHistory = await this.clientsHistoryRepository.findOne({ where: { id: clientsHistory.id } });
        if (existingClientHistory) {
            throw new NotFoundException(`Client history with ID ${clientsHistory.id} already exists`);
        }
        return this.clientsHistoryRepository.save(clientsHistory);
    }
    async update(id: string, clientsHistory: Partial<ClientsHistory>) {
        const existingClientHistory = await this.clientsHistoryRepository.findOne({ where: { id } });
        if (!existingClientHistory) {
            throw new NotFoundException(`Client history with ID ${id} not found`);
        }
        return this.clientsHistoryRepository.save({ ...existingClientHistory, ...clientsHistory });
    }
    async delete(id: string) {
        const existingClientHistory = await this.clientsHistoryRepository.findOne({ where: { id } });
        if (!existingClientHistory) {
            throw new NotFoundException(`Client history with ID ${id} not found`);
        }
        return this.clientsHistoryRepository.remove(existingClientHistory);
    }
}