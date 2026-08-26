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

    if (exists)
      throw new ConflictException(
        `이미 있는 카테고리 입니다 ${createCategoryDto.name}`,
      );
    return this.prisma.category.create({
      data: { name: createCategoryDto.name },
    });
  }

  findAll() {
    return this.prisma.category.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id: id },
    });
    if (!category)
      throw new NotFoundException(`카테고리 ${id}를 찾을 수 없습니다.`);
    return category;
  }

  async update(id: number, dto: UpdateCategoryDto) {
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('수정할 필드가 없습니다.');
    }

    await this.findOne(id);

    if (dto.name !== undefined) {
      const exists = await this.prisma.category.findUnique({
        where: { name: dto.name },
      });
      if (exists && exists.id !== id) {
        throw new ConflictException(`이미 존재하는 분류 입니다. ${dto.name}`);
      }
    }
    return this.prisma.category.update({
      where: { id: id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.category.delete({ where: { id: id } });
    return { deleted: id };
  }
}
