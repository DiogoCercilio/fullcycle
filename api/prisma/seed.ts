import { PrismaClient } from '@prisma/client';
import { ProductCreateDto } from 'src/product/product.dto';
import { UserCreateDto } from 'src/user/user.dto';
import { faker } from '@faker-js/faker';
import { CategoryCreateDto } from 'src/category/category.dto';
import { InventoryCreationDto } from 'src/inventory/inventory.dto';

const response: any = {};

(async function () {
  const prisma = new PrismaClient();

  const user: UserCreateDto = {
    email: 'admin@user.com',
    password: '123456',
  };

  // Seed User
  await prisma.user.deleteMany().then(() => prisma.user.create({ data: user }));

  // Seed Categories
  await prisma.category.deleteMany().then(async () => {
    const data: CategoryCreateDto[] = [
      { name: 'Camisetas' },
      { name: 'Sapatos' },
      { name: 'Calças' },
      { name: 'Bolsas' },
      { name: 'Meias' },
    ];
    response.categories = data.length;
    return await prisma.category.createMany({ data });
  });

  // Seed Products
  await prisma.product.deleteMany().then(async () => {
    const productData: ProductCreateDto[] = [];
    const categories = await prisma.category.findMany();

    for (const item of categories) {
      let i = 0;
      const maxProducts = 150 / categories.length;
      while (i < maxProducts) {
        i++;
        productData.push({
          category_id: item.id,
          name: `${item.name} ${faker.commerce.productName()}`,
        });
      }
    }
    response.products = productData.length;
    await prisma.product.createMany({ data: productData });
    return productData;
  });

  await prisma.inventory.deleteMany().then(async () => {
    const products = await prisma.product.findMany();
    const inventoryData: InventoryCreationDto[] = [];

    for (const item of products) {
      inventoryData.push({
        product_id: item.id,
        quantity: faker.number.int({ min: 0, max: 50 }),
      });
    }
    response.inventory = inventoryData.length;
    return await prisma.inventory.createMany({ data: inventoryData });
  });

  console.log(`Total Categories Seed - ${response.categories}`);
  console.log(`Total Product Seed - ${response.products}`);
  console.log(`Total Inventory Seed - ${response.inventory}`);
})();
