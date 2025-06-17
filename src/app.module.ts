import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { ClientsModule } from './modules/clients/clients.module';
import typeOrmConfig from './config/data-sorce';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedModule } from './sedders/seed.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ServicesModule } from './modules/services/services.module';
import { ClientsCCModule } from './modules/clients_CC/clientsCC.module';
import { ClientsHistoryModule } from './modules/clients_history/clientsHistory.module';
import { CajaModule } from './modules/caja/caja.module';
import { CajaDiariaModule } from './modules/caja_diaria/caja_diaria.module';

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
    CategoriesModule,
    ServicesModule,
    ClientsCCModule,
    ClientsHistoryModule,
    CajaModule,
    CajaDiariaModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL }); // Middleware aplicado a todas las rutas
  }
}
