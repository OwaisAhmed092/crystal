import { IsString, MaxLength, IsISO8601, IsPhoneNumber, IsOptional } from 'class-validator';

export class UpdateAccountDto {
    id: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    firstName: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    lastName: string;

    @IsOptional()
    @IsPhoneNumber()
    @MaxLength(16)
    phone: string;

    @IsOptional()
    @IsISO8601({ strict: true }, { message: 'Invalid date format. Date must be in YYYY-MM-DD format.' })
    birthday: string;
}