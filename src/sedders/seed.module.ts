import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { UserSeed } from './users/user.seed';
import { UsersModule } from 'src/modules/users/users.module';
import { Client } from 'src/modules/clients/entities/client.entity';
import { ClientSeed } from './clients/client.seed';
import { ClientsModule } from 'src/modules/clients/clients.module';
import { ClientsService } from 'src/modules/clients/clients.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Client])],
  controllers: [],
  providers: [UsersService, UserSeed, ClientSeed, ClientsService],
  exports: [],
})
export class SeedModule {}
// This module is intended for seeding the database with initial data.
// It can be used to run seed scripts or import initial data into the database.
