import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.userRepository.find();
    if (!users || users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return users.map(({ id, nombre, apellido, cel, dni, email }) => ({
      id,
      nombre,
      apellido,
      cel,
      dni,
      email,
    }));
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(`User #${id} not found`);
      }
      return user;
    } catch (error) {
      throw new NotFoundException(`User #${id} not found`);
    }
  }
  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.preload({
        id,
        ...updateUserDto,
      });
      if (!user) {
        throw new NotFoundException(`User #${id} not found`);
      }
      return this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(`Error updating user #${id}`);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userRepository.delete(id);
      if (user.affected === 0) {
        throw new NotFoundException(`User ${id} not found`);
      }
      return { message: 'Usuario eliminado exitosamente' };
    } catch (error) {
      return { message: error.message || 'Internal Server Error' };
    }
  }
}
