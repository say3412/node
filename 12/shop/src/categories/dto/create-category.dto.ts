import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'desses', description: '카테고리 이름' })
  @IsString()
  @MinLength(1)
  name: string;
}
