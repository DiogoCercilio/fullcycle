import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import {
  ProductCreateDto,
  ProductPaginatedRequestDto,
  ProductPaginatedResponseDto,
} from './product.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  async find(@Param('id') id: number): Promise<Product> {
    return await this.productService.find(id);
  }

  @Get()
  async findAll(
    @Query() query: ProductPaginatedRequestDto,
  ): Promise<ProductPaginatedResponseDto> {
    return await this.productService.findAll(query.page);
  }

  @Post()
  async create(@Body() body: ProductCreateDto): Promise<Product> {
    return await this.productService.create(body);
  }
}
