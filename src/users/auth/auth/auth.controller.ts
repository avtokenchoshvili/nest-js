import { Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from 'src/Services/auth.service';

import { Controller } from '@nestjs/common/decorators/core/controller.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() data: any): Promise<any> {
    return this.authService.signUp(data);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() SignInDto: any): Promise<{ accessToken: string }> {
    const { email, password } = SignInDto;
    return this.authService.signIn(email, password);
  }
}
