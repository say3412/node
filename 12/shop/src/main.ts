import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // swagger
  const config = new DocumentBuilder()
    .setTitle('shopping mall API (relation added)')
    .setDescription('12장 판매자 1:N, 카테고리 M:N')
    .setVersion('1.0')
    .build();

  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));
  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Prisma relation shopping mall running @ ${process.env.PORT}, swagger supporting!`,
  );
}
bootstrap();
