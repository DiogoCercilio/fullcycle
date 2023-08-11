import { Prisma } from '@prisma/client';
import { IsNumber, IsString } from 'class-validator';

export class ProductCreateDto implements Prisma.ProductCreateManyInput {
  @IsNumber()
  category_id: number;

  @IsString()
  name: string;
}

export class ProductResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  category_id: number;

  @IsString()
  category_name: string;
}

export class ProductPaginatedRequestDto {
  page: number;
}

export class ProductPaginatedResponseDto {
  data: ProductResponseDto[];
  meta: { page: number };
}
