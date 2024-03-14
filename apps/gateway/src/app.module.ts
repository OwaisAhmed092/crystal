import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE } from '@app/common/constant';
import { LoggingMiddleware } from '@app/common/middleware/logging.middleware';
import { AccountController, AuthController, ProfileController } from './controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICE.AUTH,
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_HOST,
          port: parseInt(process.env.AUTH_PORT),
        },
      },
      {
        name: SERVICE.ACCOUNT,
        transport: Transport.TCP,
        options: {
          host: process.env.ACCOUNT_HOST,
          port: parseInt(process.env.ACCOUNT_PORT),
        },
      },
    ]),
  ],
  controllers: [
    AccountController,
    AuthController,
    ProfileController
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
