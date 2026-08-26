import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: { name: createCategoryDto.name },
    });

    if (category) {
      throw new ConflictException('같은 이름의 카테고리가 이미 존재 합니다.');
    }

    return this.prisma.category.create({ data: createCategoryDto });
  }

  findAll() {
    return this.prisma.category.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id: id },
    });

    if (!category) {
      throw new NotFoundException(`카테고리 ${id} 가 존재하지 않습니다.`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    if (Object.keys(updateCategoryDto).length === 0) {
      throw new BadRequestException('name은 필수 값입니다.');
    }

    await this.findOne(id);
    return this.prisma.category.update({
      where: { id: id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.category.delete({
      where: { id: id },
    });
  }
}
