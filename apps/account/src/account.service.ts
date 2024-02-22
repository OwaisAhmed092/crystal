import { HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as argon from 'argon2';
import { Account } from '@app/common/entities';
import { RpcException } from '@nestjs/microservices';
import { CreateAccountDto, UpdateAccountDto } from '@app/common/dto';

@Injectable()
export class AccountService {

  constructor(private readonly dataSource: DataSource) { }

  async createAccount(accountData: CreateAccountDto) {

    const { password: dataPassword } = accountData;
    const hashedPassword = await argon.hash(dataPassword);
    accountData.password = hashedPassword;

    const newAccount = this.dataSource.getRepository(Account).create(accountData);
    await this.dataSource.getRepository(Account).save(newAccount)
    const { password, ...account } = newAccount;

    return account;

  }

  async findAll(skip = 0, limit = 10): Promise<Account[]> {
    return await this.dataSource.getRepository(Account).find({
      skip,
      take: limit,
    });
  }

  async findOne(id: string): Promise<Account | undefined> {
    return await this.checkAccountExist(id)
  }

  async update(accountData: UpdateAccountDto): Promise<Account | undefined> {
    const { id, ...updateData } = accountData;
    const account = await this.checkAccountExist(id);
    return await this.dataSource.getRepository(Account).save({ ...account, ...updateData });
  }

  async remove(id: string): Promise<boolean> {

    await this.checkAccountExist(id);
    await this.dataSource.getRepository(Account).delete(id);

    return true;
  }

  async checkAccountExist(id: string): Promise<Account> {
    const account = await this.dataSource.getRepository(Account).findOne({ where: { id } });
    if (!account) {
      throw new RpcException({ status: HttpStatus.BAD_REQUEST, message: 'Invalid request' });
    }

    return account;
  }

}


