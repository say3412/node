import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  isInt,
  IsInt,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({ example: '' })
  name: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({ example: '살랑살랑 쉬폰 치마' })
  description: string;

  @IsInt()
  @ApiProperty({ example: '5000' })
  price: number;

  @IsInt()
  @ApiProperty({ example: '30' })
  stock: number;

  // @IsInt()
  // @ApiProperty({ example: 18 })
  // sellerId: number;

  @IsArray()
  @IsInt({ each: true })
  @ApiProperty({ example: [1] })
  categoryIds: number[];
}
