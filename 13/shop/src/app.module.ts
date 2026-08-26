import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { CartsModule } from './carts/carts.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UPLOAD_DIR } from './common/upload.config';
import { AzureModule } from './azure/azure.module';

@Module({
  imports: [
    CategoriesModule,
    ProductsModule,
    UsersModule,
    PrismaModule,
    AuthModule,
    OrderModule,
    CartsModule,
    // 업로드한 이미지를 그대로 내려주는 모듈
    // ServeStaticModule.forRoot({
    //   rootPath: join(process.cwd(), UPLOAD_DIR), // .../shop/uploads
    //   serveRoot: '/uploads',
    // }),
    AzureModule,
  ],
  // http://localhost:3000/uploads/86c3c959-945d-4b2b-a8b4-58e0d0966db8.jpg
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
