import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 한번 등록하면 모든 모듈이 prisma service를 주입받을 수 있다. [DB 커넥션은 앱 전체 공유 자원]
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
