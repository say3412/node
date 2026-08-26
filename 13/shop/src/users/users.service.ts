import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { QueryUsertDto } from './dto/query-user.dto';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (exists) {
      throw new ConflictException('이미 등록된 이메일 입니다.');
    }

    return this.prisma.user.create({ data: createUserDto });
  }

  async findAll(query: QueryUsertDto) {
    const { page, limit } = query;
    const [items, total] = await Promise.all([
      this.prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      this.prisma.user.count(),
    ]);

    return { items, total, page, limit, totalPage: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException(`${id} 번 사용자가 없습니다.`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (Object.keys(updateUserDto).length === 0) {
      throw new BadRequestException(
        '사용자의 정보가 정확하지 않습니다. 확인해주세요.',
      );
    }

    await this.findOne(id);

    return this.prisma.user.update({
      where: { id: id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.user.delete({
      where: { id: id },
    });
  }

  // register
  async createUser(data: {
    email: string;
    name: string;
    password: string;
    role: Role;
  }) {
    return this.prisma.user.create({ data });
  }

  // login
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
