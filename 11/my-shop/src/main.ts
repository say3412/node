import 'dotenv/config'; // from .evn 를 읽어서 환경 변수를 process.env 에 넣어줌
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // swagger - global config
  const config = new DocumentBuilder()
    .setTitle('쇼핑몰 API')
    .setDescription('11장 - 분류/상품 CRUD')
    .setVersion('1.0')
    .build();

  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));
  // SwaggerModule.createDocument
  // Nest app 에 등록된 모든 모듈과 컨트롤러 라우터를 훓는다.
  // DTO 에 @ApiProperty, 컨트롤러 @ApiTags 읽어
  // Open Api 스펙으로 반환

  // SwaggerModule.setup
  // "docs" : http://localhost:PORT/docs 문서로 접속하면 스웨거 문서 읽음
  // app : Nest Js Express app

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Prisma 기초(쇼핑몰) 시작 http://localhost:${process.env.PORT}`);
}
bootstrap();
