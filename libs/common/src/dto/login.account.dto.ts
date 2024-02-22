import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class LoginAccountDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    password: string;
}