import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  // exports: [UsersService], global로 선언했기 때문에 추가로 안해줘도 된다.
})
export class UsersModule {}
