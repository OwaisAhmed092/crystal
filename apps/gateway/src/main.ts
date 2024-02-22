import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpErrorFilter } from '@app/common/utils/filter';
import { ValidationPipe } from '@app/common/utils/pipe';
import * as admin from 'firebase-admin';

const serviceAccount = require('../../../serviceAccountKey.json');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpErrorFilter());
  app.setGlobalPrefix('api');

  await app.listen(process.env.ROOT_PORT);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

bootstrap();
