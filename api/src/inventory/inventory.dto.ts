import { Prisma } from '@prisma/client';
import { IsNumber } from 'class-validator';

export class InventoryCreationDto implements Prisma.InventoryCreateManyInput {
  @IsNumber()
  product_id: number;

  @IsNumber()
  quantity: number;
}
