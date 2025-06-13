import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './config/data-sorce';
import { InternalServerErrorException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  try {
    const test = await AppDataSource.initialize();
    console.log(test.isInitialized);
    
    console.log('✅ Database connection established successfully');
  } catch (error) {
    throw new InternalServerErrorException(`❌ Error starting the database connection: ${error.message}`);
  }
  try {
    const port = process.env.PORT;
    const test = await app.listen(Number(port) , () => {
      console.log(`✅ Camansi API is running on port ${port}`);
    }
    );
  } catch (error) {
    throw new InternalServerErrorException(`❌ Error starting the server`);
  }
}

bootstrap();
