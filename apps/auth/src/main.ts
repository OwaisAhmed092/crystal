import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import * as admin from 'firebase-admin';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const serviceAccount = require('../../../serviceAccountKey.json');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.AUTH_HOST,
        port: parseInt(process.env.AUTH_PORT),
      },
    },
  );
  console.log("AUTH_HOST", process.env.AUTH_HOST)
  console.log("AUTH_PORT", process.env.AUTH_PORT)
  app.listen();
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

bootstrap();

