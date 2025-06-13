import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './config/data-sorce';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  try {
    await AppDataSource.initialize();
    console.log('✅ Database connection established successfully');

    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Server running on http://localhost:${port}`);
  } catch (error) {
    console.error('❌ Error connecting to the database:', error);
  }
}

bootstrap();