import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [JwtModule.registerAsync(jwtConfig)],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtService],
})
export class AuthModule {}
