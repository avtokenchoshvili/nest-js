import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { AppService } from './app.service';
import { Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
