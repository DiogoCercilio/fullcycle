import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InventoryCreationDto } from './inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly service: PrismaService) {}

  private async findAndUpdate(data: InventoryCreationDto, fn: any) {
    const product = await this.service.product.findUnique({
      where: { id: data.product_id },
    });

    if (!product) {
      throw new BadRequestException(
        `Adding to Inventory error - Product ${data.product_id} not found`,
      );
    }

    const currentInventory = await this.service.inventory.findFirst({
      where: { product_id: product.id },
    });

    if (currentInventory) {
      return await this.service.inventory.update({
        where: { product_id: product.id },
        data: { ...data, quantity: fn(currentInventory.quantity) },
      });
    } else {
      return await this.service.inventory.create({
        data: { ...data, quantity: fn() },
      });
    }
  }

  async add(data: InventoryCreationDto) {
    return this.findAndUpdate(data, (quantity = 0) => {
      return quantity + data.quantity;
    });
  }

  async sub(data: InventoryCreationDto) {
    const subtract = (quantity = 0) => {
      const updatedValue = quantity - data.quantity;
      if (updatedValue < 0) {
        throw new BadRequestException(`quantity should not be less than zero`);
      }
      return updatedValue;
    };
    return this.findAndUpdate(data, subtract);
  }
}
