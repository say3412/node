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
    const exists = await this.prisma.category.findUnique({
      where: { name: createCategoryDto.name },
    });

    if (exists) {
      throw new ConflictException('중복된 카테고리가 있습니다.');
    }

    return await this.prisma.category.create({
      data: createCategoryDto,
    });
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
      throw new NotFoundException(`${id} 번 카테고리가 존재하지 않습니다.`);
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    if (Object.keys(updateCategoryDto).length === 0) {
      throw new BadRequestException(
        '수정할 데이터가 올바르지 않습니다. 다시 확인해주세요.',
      );
    }

    this.findOne(id);

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
