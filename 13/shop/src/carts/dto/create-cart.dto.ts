import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateCartDto {
  @IsInt()
  @ApiProperty({ example: 1, description: '상품 id' })
  productId: number;

  @IsInt()
  @ApiProperty({ example: 1, description: '수량은 1개 이상' })
  quantity: number;
}
