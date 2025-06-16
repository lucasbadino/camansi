import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import typeOrmConfig from './config/data-sorce';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedModule } from './sedders/seed.module';
import { CategoriesModule } from './categories/categories.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ServicesModule } from './services/services.module';

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
