import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common/module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '@app/common/entities';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      Account
    ])
  ],
  controllers: [
    AccountController
  ],
  providers: [
    AccountService
  ],
})
export class AccountModule { }
