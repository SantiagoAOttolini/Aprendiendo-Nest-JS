import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // Ruta base: /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint POST /auth/register
  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name?: string,
  ) {
    return this.authService.register(email, password, name);
  }

  // Endpoint POST /auth/login
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(email, password);
  }
}
