import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientsService } from "src/modules/clients/clients.service";
import { Client } from "src/modules/clients/entities/client.entity";
import { Repository } from "typeorm";
import { clientsData } from "../data";
import { CreateClientDto } from "src/modules/clients/dto/create-client.dto";

@Injectable()
export class ClientSeed {
 constructor(
   @InjectRepository(Client)
   private readonly clientsRepository: Repository<Client>,
    private readonly clientsService: ClientsService,
 ) {}
 async seedClients(): Promise<void> { 
    const data = clientsData as CreateClientDto[];
    for (const client of data) {
      const existingClient = await this.clientsRepository.findOneBy({ email: client.email });
      if (!existingClient) {
         const newClient = this.clientsRepository.create(client);
         await this.clientsRepository.save(newClient);
         console.log(`Client ${newClient.nombre} ${newClient.apellido} created successfully.`);
      } else {
         console.log(`Client with email ${client.email} already exists.`);
      }
    }
 } 
}