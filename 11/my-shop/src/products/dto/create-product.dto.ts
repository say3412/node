import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString, Min, MinLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: '신선한 계란' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ example: '화이트 농장에서 갓 생산된 신선한 계란' })
  @IsString()
  description: string;

  @ApiProperty({ example: 5000, description: '원 단위' })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  price: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  stock: number;

  @ApiProperty({ example: 1, description: '카테고리 ID' })
  @IsInt()
  @Type(() => Number)
  categoryId: number;
}
