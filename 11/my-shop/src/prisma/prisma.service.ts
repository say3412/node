import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// PrismaClient NestJs 생명주기 연결
// 모듈이 뜰 때 DB 연결하고, 내려갈 때 DB 연결 닫음
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect(); // prismaClient가 커넥션풀링 관리
  }

  async onModuleDestroy() {
    await this.$disconnect(); // prismaClient가 커넥션풀링 관리
  }
}
