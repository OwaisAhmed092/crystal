import { SERVICE } from '@app/common/constant';
import { CreateAccountDto, LoginAccountDto } from '@app/common/dto';
import { Body, Controller, HttpException, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {

    constructor(
        @Inject(SERVICE.AUTH) private readonly authClient: ClientProxy,
        @Inject(SERVICE.ACCOUNT) private readonly accountClient: ClientProxy
    ) { }

    @Post('login')
    async login(@Body() credentials: LoginAccountDto) {
        try {
            return await lastValueFrom(this.authClient.send({ cmd: 'login' }, { ...credentials }));
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    @Post('register')
    async register(@Body() userData: CreateAccountDto) {
        try {
            const id = await lastValueFrom(this.authClient.send({ cmd: 'register' }, { ...userData }));
            return await lastValueFrom(this.accountClient.send({ cmd: 'createAccount' }, { id, ...userData }));
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

}
