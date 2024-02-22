import { SERVICE } from '@app/common/constant';
import { UpdateAccountDto } from '@app/common/dto';
import { AuthGuard } from '@app/common/guard';
import { User } from '@app/common/utils/decorator';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Put, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('account')
export class AccountController {

    constructor(
        @Inject(SERVICE.AUTH) private readonly authClient: ClientProxy,
        @Inject(SERVICE.ACCOUNT) private readonly accountClient: ClientProxy
    ) { }

    @Get()
    @UseGuards(AuthGuard)
    async getAllAccount(@Query('skip') skip: number = 0, @Query('limit') limit: number = 10) {
        try {
            return await lastValueFrom(this.accountClient.send({ cmd: 'findAllAccount' }, { skip, limit }));
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getAccountById(@Param('id') id: string) {
        try {
            return await lastValueFrom(this.accountClient.send({ cmd: 'findAccountById' }, { id }));
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async updateAccount(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
        try {
            return await lastValueFrom(this.accountClient.send({ cmd: 'updateAccount' }, { ...updateAccountDto, id }));
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteAccount(@User('uid') uid, @Param('id') id: string) {
        try {
            if (uid == id) {
                throw new HttpException("You can't delete your record.", HttpStatus.BAD_REQUEST);
            }
            await lastValueFrom(this.accountClient.send({ cmd: 'removeAccount' }, { id }));
            await lastValueFrom(this.authClient.send({ cmd: 'deleteUser' }, { id }));
            return { isDeleted: true }
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    @Get('verify/:id')
    async verifyAccount(@Param('id') id: string) {
        try {
            return await lastValueFrom(this.accountClient.send({ cmd: 'verifyAccount' }, { id }));
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

}
