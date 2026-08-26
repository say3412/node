import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'seller@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'seller1' })
  @IsString()
  @MinLength(2)
  name: string;
}
