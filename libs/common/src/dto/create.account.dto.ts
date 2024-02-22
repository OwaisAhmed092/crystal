import { IsString, MinLength, MaxLength, IsEmail, IsISO8601, IsPhoneNumber } from 'class-validator';

export class CreateAccountDto {
  id: string;

  @IsString()
  @MaxLength(100)
  firstName: string;

  @IsString()
  @MaxLength(100)
  lastName: string;

  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;

  @IsPhoneNumber()
  @MaxLength(16)
  phone: string;

  @IsISO8601({ strict: true }, { message: 'Invalid date format. Date must be in YYYY-MM-DD format.' })
  birthday: string;
}