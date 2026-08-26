import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ example: 'seller@email.com' })
  email: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({ example: 'Nana Kim' })
  name: string;
}
