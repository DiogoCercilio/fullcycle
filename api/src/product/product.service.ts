import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ProductCreateDto,
  ProductPaginatedResponseDto,
  ProductResponseDto,
} from './product.dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly service: PrismaService) {}

  /**
   * Finds a product when an ID is given
   * @param id number - The Product ID
   * @returns ProductResponseDto
   */
  async find(id: number): Promise<ProductResponseDto> {
    const product = await this.service.product
      .findFirst({
        where: { id },
        include: {
          category: true,
          inventory: true,
        },
      })
      .then((res) => ({
        id: res.id,
        name: res.name,
        quantity: Number(res?.inventory?.quantity || 0),
        category_id: res.category.id,
        category_name: res.category.name,
      }));

    if (!product) throw new NotFoundException(`Product doesn't exist`);

    return product;
  }

  /**
   * Finds an array of Products (Limit 15 results)
   * @param page number - The current pagination
   * @returns ProductPaginatedResponseDto
   */
  async findAll(page: number = 1): Promise<ProductPaginatedResponseDto> {
    const resultsPerPage = 15;
    const currentPage = page;
    const skip = resultsPerPage * (currentPage - 1);

    return await this.service.product
      .findMany({
        take: resultsPerPage,
        skip,
        orderBy: [{ name: 'asc' }],
        include: {
          category: true,
          inventory: true,
        },
      })
      .then((res) => {
        const data = res.map(({ id, name, inventory, category }) => ({
          id,
          name,
          quantity: Number(inventory?.quantity || 0),
          category_id: category.id,
          category_name: category.name,
        }));

        return {
          data,
          meta: {
            page,
          },
        };
      });
  }

  /**
   * Create a new Product
   * @param data ProductCreateDto
   * @returns Product
   */
  async create(data: ProductCreateDto): Promise<Product> {
    const category = await this.service.category.findFirst({
      where: { id: data.category_id },
    });

    if (!category) {
      throw new BadRequestException(`Invalid Category given`);
    }
    return await this.service.product.create({ data });
  }
}
