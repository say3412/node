import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CartsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCartDto: CreateCartDto, userId: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: createCartDto.productId },
    });

    if (!product) {
      throw new NotFoundException(
        `상품 ${createCartDto.productId} 번이 없습니다.`,
      );
    }

    let created;
    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: { id: createCartDto.productId },
      });

      if (!product) {
        throw new NotFoundException('상품이 없습니다.');
      }

      if (product.stock < createCartDto.quantity) {
        throw new BadRequestException(
          `${product.name} 재고가 부족하여 장바구니에 담을 수 없습니다.`,
        );
      }

      created = await tx.cartItem.upsert({
        where: {
          userId_productId: { userId, productId: createCartDto.productId },
        },
        update: { quantity: { increment: createCartDto.quantity } },
        create: {
          userId,
          productId: createCartDto.productId,
          quantity: createCartDto.quantity,
        },
      });
    });

    return created;
    // return this.prisma.cartItem.upsert({
    //   where: {
    //     userId_productId: {
    //       userId: userId,
    //       productId: createCartDto.productId,
    //     },
    //   },
    //   update: { quantity: { increment: createCartDto.quantity } }, // quantity + 1
    //   create: {
    //     userId,
    //     productId: createCartDto.productId,
    //     quantity: createCartDto.quantity,
    //   },
    // });
  }

  findAll() {
    return `This action returns all carts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
