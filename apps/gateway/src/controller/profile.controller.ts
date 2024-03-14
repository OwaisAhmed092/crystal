import { SERVICE } from '@app/common/constant';
import { UpdateAccountDto } from '@app/common/dto';
import { AuthGuard } from '@app/common/guard';
import { User } from '@app/common/utils/decorator';
import { resolveObservable } from '@app/common/utils/helper';
import { Body, Controller, Delete, Get, HttpException, Inject, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('profile')
export class ProfileController {

    constructor(@Inject(SERVICE.ACCOUNT) private readonly accountClient: ClientProxy) { }

    @Get()
    @UseGuards(AuthGuard)
    async getProfile(@User('uid') id) {
        try {
            return await resolveObservable(this.accountClient.send({ cmd: 'findAccountById' }, { id }));
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

}
