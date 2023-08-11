import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma/prisma.service';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [AuthModule, CategoryModule, ProductModule, InventoryModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule {}
