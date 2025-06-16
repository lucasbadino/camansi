import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>, // Assuming you have a repository for database operations
  ) { }
  async create(createClientDto: CreateClientDto) {
    const client = await this.clientsRepository.create(createClientDto);
    if (!client) {
      throw new BadRequestException('Error creating client');
    }
    await this.clientsRepository.save(client);
    return client;
  }

  async findAll() {
    const clients = await this.clientsRepository.find();
    if (clients.length === 0) {
      throw new BadRequestException('No clients found');
    }
    return clients;
  }

  async findOne(id: string) {
    const client = await this.clientsRepository.findOneBy({ id });
    if (!client) {
      throw new BadRequestException('Client not found');
    }
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    await this.clientsRepository.update(id, updateClientDto);
    return this.clientsRepository.findOneBy({ id });
  }

  async remove(id: string) {
    await this.clientsRepository.delete(id);
    return { message: 'Client deleted successfully' };
  }
}
