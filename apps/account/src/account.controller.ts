import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AccountService } from './account.service';
import { CreateAccountDto, UpdateAccountDto } from '@app/common/dto';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @MessagePattern({ cmd: 'createAccount' })
  async createAccount(@Payload() accountData: CreateAccountDto) {
    return await this.accountService.createAccount(accountData);
  }

  @MessagePattern({ cmd: 'findAllAccount' })
  async findAllAccount(@Payload() data: any) {
    return await this.accountService.findAll(data?.skip, data?.limit);
  }

  @MessagePattern({ cmd: 'findAccountById' })
  async findAccountById(@Payload() data: { id: string }) {
    return await this.accountService.findOne(data.id);
  }

  @MessagePattern({ cmd: 'updateAccount' })
  async updateAccount(@Payload() accountData: UpdateAccountDto) {
    return await this.accountService.update(accountData);
  }

  @MessagePattern({ cmd: 'removeAccount' })
  async removeAccount(@Payload() data: { id: string }) {
    return await this.accountService.remove(data.id);
  }

  @MessagePattern({ cmd: 'verifyAccount' })
  async verifyAccount(@Payload() data: { id: string }) {
    return { status: "Verified" };
  }
}
