import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsIn,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @ApiProperty({ example: 'seller@demo.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'secret123' })
  @MinLength(6)
  password: string;

  @IsString()
  @ApiProperty({ example: '판매자' })
  @MinLength(1)
  name: string;

  @IsOptional()
  @IsIn(['BUYER', 'SELLER'])
  @ApiProperty({ enum: ['BUYER', 'SELLER'], default: 'BUYER' })
  role?: 'BUYER' | 'SELLER';
}
