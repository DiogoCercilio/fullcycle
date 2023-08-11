import { Prisma } from '@prisma/client';
import { IsString } from 'class-validator';

export class CategoryCreateDto implements Prisma.CategoryCreateManyInput {
  @IsString()
  name: string;
}
