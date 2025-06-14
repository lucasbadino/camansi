import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InternalServerErrorException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  try {
    const port = process.env.PORT;
    await app.listen(Number(port), () => {
      console.log(`✅ Camansi API is running on port ${port}`);
    });
  } catch (error) {
    throw new InternalServerErrorException(`❌ Error starting the server`);
  }
}

bootstrap();
