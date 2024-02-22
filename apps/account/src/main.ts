import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AccountModule } from './account.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AccountModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.SERVER_HOST,
        port: parseInt(process.env.ACCOUNT_PORT),
      },
    },
  );
  app.listen();
}

bootstrap();
