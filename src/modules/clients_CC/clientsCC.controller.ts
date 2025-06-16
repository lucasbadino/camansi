import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ClientsCCService } from './clientsCC.service';
import { Response } from 'express';
import { ClientsCC } from './entities/clientsCC.entity';

@Controller('clientscuenta')
export class ClientsCCController {
  constructor(private readonly clientsCCService: ClientsCCService) {}
  @Get()
  async getAllClientsCC(@Res() res: Response) {
    try {
      const clients = await this.clientsCCService.getAllClientsCC();
      return res.status(200).json({
        message: 'Clients retrieved successfully',
        data: clients,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || 'Internal server error',
      });
    }
  }
  @Get(':id')
  async getClientCCById(
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    try {
      const client = await this.clientsCCService.getClientCCById(id);
      return res.status(200).json({
        message: 'Client retrieved successfully',
        data: client,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || 'Internal server error',
      });
    }
  }
  @Post()
  async createClientCC(
    @Res() res: Response,
    @Body() clientsCC: Partial<ClientsCC>,
  ) {
    try {
      const client = await this.clientsCCService.createClientCC(clientsCC);
      return res.status(201).json({
        message: 'Client created successfully',
        data: client,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || 'Internal server error',
      });
    }
  }
  @Patch(':id')
  async updateClientCC(
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() clientsCC: Partial<ClientsCC>,
  ) {
    try {
      const client = await this.clientsCCService.updateClientCC(id, clientsCC);
      return res.status(200).json({
        message: 'Client updated successfully',
        data: client,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || 'Internal server error',
      });
    }
  }
  @Delete(':id')
  async deleteClientCC(
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    try {
      const client = await this.clientsCCService.deleteClientCC(id);
      return res.status(200).json({
        message: 'Client deleted successfully',
        data: client,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || 'Internal server error',
      });
    }
  }
}
