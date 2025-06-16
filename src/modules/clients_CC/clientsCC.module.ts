import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsCC } from './entities/clientsCC.entity';
import { ClientsCCController } from './clientsCC.controller';
import { ClientsCCService } from './clientsCC.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientsCC])],
  controllers: [ClientsCCController],
  providers: [ClientsCCService],
})
export class ClientsCCModule {}
