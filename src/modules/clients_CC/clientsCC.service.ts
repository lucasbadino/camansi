import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientsCC } from './entities/clientsCC.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsCCService {
  constructor(
    @InjectRepository(ClientsCC)
    private readonly clientsCCRepository: Repository<ClientsCC>,
  ) {}

  async getAllClientsCC() {
    const clients = await this.clientsCCRepository.find();
    if (clients.length === 0) {
      throw new NotFoundException('No clients found');
    }
    return clients;
  }
  async getClientCCById(id: string) {
    const client = await this.clientsCCRepository.findOneBy({ id });
    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
    return client;
  }
  async createClientCC(clientData: Partial<ClientsCC>) {
    const newClient = this.clientsCCRepository.create(clientData);
    if (!newClient.id) {
      throw new BadRequestException(
        'failed to create a cuenta corriente',
      );
    }
    return await this.clientsCCRepository.save(newClient);
  }
  async updateClientCC(id: string, clientData: Partial<ClientsCC>) {
    const client = await this.getClientCCById(id);
    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
    if (!clientData) {
      throw new BadRequestException('No data provided for update');
    }
    return await this.clientsCCRepository.update(id, clientData);
  }
  async deleteClientCC(id: string) {
    const client = await this.getClientCCById(id);
    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
    return await this.clientsCCRepository.remove(client);
  }
}
