import { Body, Controller, Post } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryCreationDto } from './inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('add')
  async add(@Body() body: InventoryCreationDto): Promise<any> {
    return this.inventoryService.add(body);
  }

  @Post('sub')
  async sub(@Body() body: InventoryCreationDto): Promise<any> {
    return this.inventoryService.sub(body);
  }
}
