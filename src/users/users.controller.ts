import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import e, { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const users = await this.usersService.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error.message || 'Internal Server Error');
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    try {
      const user = await this.usersService.findOne(id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error.message || 'Internal Server Error');
    }
  }
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this.usersService.create(createUserDto);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json(error.message || 'Internal Server Error');
    }
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error.message || 'Internal Server Error');
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    try {
      const user = await this.usersService.remove(id);
      return res.status(200).json({ message: user.message || 'User deleted successfully' });
    } catch (error) {
      return res.status(500).json(error.message || 'Internal Server Error');
    }
  }
}
