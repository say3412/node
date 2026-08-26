import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/say") // app.get("/say", (req, res))
  getSayHi(): string {
    return this.appService.getSayHi();
  }

  @Get("/profile")
  getProfile():string {
    return this.appService.getProfile();
  }

  @Get("/path")
  getPath():string {
    return this.appService.getPath();
  }
}
