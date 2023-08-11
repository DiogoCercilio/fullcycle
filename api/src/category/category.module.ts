import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule],
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, JwtService],
})
export class CategoryModule {}
