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
import { ServicesService } from './services.service';
import { Response } from 'express';
import { ServiceEntity } from './entities/service.entity';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async getAllServices(@Res() res: Response) {
    try {
      const services = await this.servicesService.getAll();
      return res.status(200).json({
        success: true,
        data: services,
        message: 'Services retrieved successfully',
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'An error occurred while retrieving services',
        error: error.message,
      });
    }
  }
  @Get(':id')
  async getServiceById(
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    try {
      const service = await this.servicesService.getById(id);
      return res.status(200).json({
        success: true,
        data: service,
        message: 'Service retrieved successfully',
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: `Service with id ${id} not found`,
        error: error.message,
      });
    }
  }
  @Post()
  async createService(
    @Res() res: Response,
    @Body() serviceData: Partial<ServiceEntity>,
  ) {
    try {
      const newService = await this.servicesService.create(serviceData);
      return res.status(201).json({
        success: true,
        data: newService,
        message: 'Service created successfully',
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'An error occurred while creating the service',
        error: error.message,
      });
    }
  }
  @Patch(':id')
  async updateService(
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() serviceData: Partial<ServiceEntity>,
  ) {
    try {
      const updatedService = await this.servicesService.update(id, serviceData);
      return res.status(200).json({
        success: true,
        data: updatedService,
        message: 'Service updated successfully',
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: `An error occurred while updating the service with id ${id}`,
        error: error.message,
      });
    }
  }
  @Delete(':id')
  async deleteService(
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    try {
      const deletedService = await this.servicesService.delete(id);
      return res.status(200).json({
        success: true,
        data: deletedService,
        message: 'Service deleted successfully',
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: `Service with id ${id} not found`,
        error: error.message,
      });
    }
  }
}
