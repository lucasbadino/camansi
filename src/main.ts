import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InternalServerErrorException } from '@nestjs/common';
import { UserSeed } from './sedders/users/user.seed';
import { ClientSeed } from './sedders/clients/client.seed';


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
  const user_seed = app.get(UserSeed);
  user_seed.seedUsers();
  console.log("preloaded users");
  const client_seed = app.get(ClientSeed);
  client_seed.seedClients();
  console.log("preloaded clients");
}

bootstrap();
