import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateAccountDto, LoginAccountDto } from '@app/common/dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @MessagePattern({ cmd: 'register' })
  async register(@Payload() userData: CreateAccountDto) {
    return await this.authService.register(userData.email, userData.password);
  }

  @MessagePattern({ cmd: 'login' })
  async login(@Payload() credentials: LoginAccountDto) {
    return await this.authService.login(credentials.email, credentials.password);
  }

  @MessagePattern({ cmd: 'deleteUser' })
  async deleteUser(@Payload() data: { id: string }) {
    return await this.authService.deleteUser(data.id);
  }
}
