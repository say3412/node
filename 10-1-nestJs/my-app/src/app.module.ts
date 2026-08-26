import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [PostsModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
