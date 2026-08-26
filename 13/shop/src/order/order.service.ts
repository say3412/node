import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async checkout(userId: number) {
    // 1. 카트 아이템 목록 조회
    const cart = await this.prisma.cartItem.findMany({
      where: { userId },
      include: { product: { select: { id: true, name: true, price: true } } },
    });

    if (cart.length === 0) {
      throw new BadRequestException('장바구니가 비어서 주문 할 수 없습니다.');
    }

    // 2. transaction 감싸서 작업 준비
    return this.prisma.$transaction(async (tx) => {
      let total = 0; // 주문 전체 가격
      // cartitem -> orderitem
      const itemData: {
        productId: number;
        quantity: number;
        unitPrice: number;
      }[] = [];

      // cart 정보를 하나씩 돌면서 계산
      for (const item of cart) {
        // 1. 재고 차감
        const updated = await tx.product.updateMany({
          where: { id: item.productId, stock: { gte: item.quantity } },
          data: { stock: { decrement: item.quantity } },
        });

        // 2. updated == 0 재고가 부족
        if (updated.count === 0) {
          throw new ConflictException(
            `${item.product.name} 재고가 부족합니다.`,
          );
        }

        total += item.product.price * item.quantity; // total price

        // orderItem에 담을 준비
        itemData.push({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.product.price,
        });
      } // end of for

      // 3. create order
      const order = await tx.order.create({
        data: {
          buyerId: userId,
          totalPrice: total,
          items: { create: itemData }, // creat oderItems 자동으로 생성
        },
        include: { items: true }, // 주문을 생성한 후 상세항목 보여주기
      });

      // 4. 장바구니 비우기
      await tx.cartItem.deleteMany({
        where: { userId },
      });
    });
  }

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
