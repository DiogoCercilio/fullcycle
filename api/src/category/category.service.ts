import { Injectable } from '@nestjs/common';
import { CategoryCreateDto } from './category.dto';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly service: PrismaService) {}

  async findAll(): Promise<Category[]> {
    return await this.service.category.findMany();
  }

  async create(data: CategoryCreateDto): Promise<Category> {
    return await this.service.category.create({ data });
  }
}
