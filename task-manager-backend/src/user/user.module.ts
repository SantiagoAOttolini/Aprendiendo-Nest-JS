import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthModule } from '../auth/auth.module';

// Módulo de usuario: agrupa el servicio y el controlador
@Module({
  imports: [AuthModule], // Importa AuthModule para acceso a AuthService
  providers: [UserService, JwtAuthGuard],
  controllers: [UserController],
})
export class UserModule {}
