import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users') // Ruta base: /users
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Endpoint GET /users para listar todos los usuarios
  // Ahora protegido con JWT: solo usuarios autenticados pueden acceder
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }
}
