import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceEntity } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
  ) {}
  async getAll() {
    const services = await this.serviceRepository.find();
    if (!services || services.length === 0) {
      throw new NotFoundException('No services found');
    }
    return services;
  }
  async getById(id: string) {
    const service = await this.serviceRepository.findOneBy({ id });
    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
    return service;
  }
  async create(serviceData: Partial<ServiceEntity>) {
    const newService = this.serviceRepository.create(serviceData);
    if (!newService.name || !newService.description) {
      throw new NotFoundException(
        'Name and description are required to create a service',
      );
    }
    return await this.serviceRepository.save(newService);
  }
  async update(id: string, serviceData: Partial<ServiceEntity>) {
    const service = await this.getById(id);
    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
    if (!serviceData) {
      throw new Error('No data provided for update');
    }
    return await this.serviceRepository.update(id, serviceData);
  }
  async delete(id: string) {
    const service = await this.getById(id);
    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
    return await this.serviceRepository.remove(service);
  }
}
