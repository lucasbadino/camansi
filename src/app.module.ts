import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import typeOrmConfig from './config/data-sorce';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedModule } from './sedders/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('typeorm'),
      }),
    }),
    UsersModule,
    ClientsModule,
    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
