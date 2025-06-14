import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ParseUUIDPipe } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Response } from 'express';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto, @Res() res: Response) {
    try {
      const client = await this.clientsService.create(createClientDto);
      return res.status(201).json(client);
    } catch (error) {
      return res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const clients = await this.clientsService.findAll();
      return res.status(200).json(clients);
    } catch (error) {
      return res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    try {
      const client = await this.clientsService.findOne(id);
      return res.status(200).json(client);
    } catch (error) {
      return res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateClientDto: UpdateClientDto, @Res() res: Response) {
    try {
      const client = await this.clientsService.update(id, updateClientDto);
      return res.status(200).json(client);
    } catch (error) {
      return res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    try {
      const client = await this.clientsService.remove(id);
      return res.status(200).json({ message: client.message || 'Client deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
  }
}
