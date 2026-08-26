import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UploadedFile, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { mkdir, mkdirSync } from 'fs';
// import { UPLOAD_DIR } from './common/upload.config';
import { config as loadEnv } from 'dotenv';

loadEnv(); // AZURE_STORAGE_CONNECTION_STRING 등을 .env에서 가져오기 위해 사용

async function bootstrap() {
  // mkdirSync(UPLOAD_DIR, { recursive: true });

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // swagger
  const config = new DocumentBuilder()
    .setTitle('my shop API')
    .setDescription('13 relation study')
    .setVersion('1.0')
    .addBearerAuth() // 보호 라우팅용
    .build();

  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));

  const port = Number(process.env.PORT);
  await app.listen(port ?? 3008);
  console.log(`running @ ${port}`);
}
bootstrap();
