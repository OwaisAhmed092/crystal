import { SERVICE } from '@app/common/constant';
import { UpdateAccountDto } from '@app/common/dto';
import { AuthGuard } from '@app/common/guard';
import { User } from '@app/common/utils/decorator';
import { resolveObservable } from '@app/common/utils/helper';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Put, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('account')
export class AccountController {

    constructor(
        @Inject(SERVICE.AUTH) private readonly authClient: ClientProxy,
        @Inject(SERVICE.ACCOUNT) private readonly accountClient: ClientProxy
    ) { }

    @Get()
    @UseGuards(AuthGuard)
    async getAllAccount(@Query('skip') skip: number = 0, @Query('limit') limit: number = 10) {
        return await resolveObservable(this.accountClient.send({ cmd: 'findAllAccount' }, { skip, limit }));
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getAccountById(@Param('id') id: string) {
        return await resolveObservable(this.accountClient.send({ cmd: 'findAccountById' }, { id }));
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async updateAccount(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
        return await resolveObservable(this.accountClient.send({ cmd: 'updateAccount' }, { ...updateAccountDto, id }));
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteAccount(@User('uid') uid, @Param('id') id: string) {
        if (uid == id) {
            throw new HttpException("You can't delete your record.", HttpStatus.BAD_REQUEST);
        }
        await resolveObservable(this.accountClient.send({ cmd: 'removeAccount' }, { id }));
        await resolveObservable(this.authClient.send({ cmd: 'deleteUser' }, { id }));
        return { isDeleted: true }
    }

    @Get('verify/:id')
    async verifyAccount(@Param('id') id: string) {
        return await resolveObservable(this.accountClient.send({ cmd: 'verifyAccount' }, { id }));
    }

}
