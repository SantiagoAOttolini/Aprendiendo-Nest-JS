import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

// Módulo de usuario: agrupa el servicio y el controlador
@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
