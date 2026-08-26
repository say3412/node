import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CategoriesService } from '../categories/categories.service';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categoryService: CategoriesService,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.products.create({ data: createProductDto });
  }

  async findAll(query: QueryProductDto) {
    const { page, limit } = query;
    const [items, total] = await Promise.all([
      this.prisma.products.findMany({
        skip: (page - 1) * limit, // offset
        take: limit, // limit
        orderBy: { id: 'desc' },
      }),
      this.prisma.products.count(),
    ]);
    return { items, total, page, limit, totalPage: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const product = await this.prisma.products.findUnique({ where: { id } });
    if (!product) throw new NotFoundException(`상품 ${id}를 찾을 수 없습니다.`);
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    return this.prisma.products.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.products.delete({ where: { id } });

    return { deleted: id };
  }
}
