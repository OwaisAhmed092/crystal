import { SERVICE } from '@app/common/constant';
import { CreateAccountDto, LoginAccountDto } from '@app/common/dto';
import { resolveObservable } from '@app/common/utils/helper';
import { Body, Controller, HttpException, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {

    constructor(
        @Inject(SERVICE.AUTH) private readonly authClient: ClientProxy,
        @Inject(SERVICE.ACCOUNT) private readonly accountClient: ClientProxy
    ) { }

    @Post('login')
    async login(@Body() credentials: LoginAccountDto) {
        return await resolveObservable(this.authClient.send({ cmd: 'login' }, { ...credentials }));
    }

    @Post('register')
    async register(@Body() userData: CreateAccountDto) {
        const id = await resolveObservable(this.authClient.send({ cmd: 'register' }, { ...userData }));
        return await resolveObservable(this.accountClient.send({ cmd: 'createAccount' }, { id, ...userData }));
    }

}
