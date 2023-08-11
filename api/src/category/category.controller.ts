import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryCreateDto } from './category.dto';
import { Category } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('categories')
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(private readonly appService: CategoryService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return await this.appService.findAll();
  }

  @Post()
  async create(@Body() data: CategoryCreateDto): Promise<Category> {
    return this.appService.create(data);
  }
}
