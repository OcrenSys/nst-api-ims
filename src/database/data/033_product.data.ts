import { Product } from '../models/product.entity';
import { BrandData } from './009_brand.data';
import { SectionData } from './009_section.data';
import { SubCategoryData } from './032_subCategory';
import { faker } from '@faker-js/faker';

const getProducts = (): Product[] => {
  return Array(50)
    .fill(null)
    .map(() => ({
      position: 1,
      code: faker.string.uuid().slice(0, 10),
      description: faker.commerce.product.name,
      stock: faker.number.int({ min: 0, max: 100 }),
      cost: +faker.commerce.price({ min: 0, max: 100, dec: 0 }),
      price: +faker.commerce.price({ min: 0, max: 100, dec: 0 }),
      priceCredit: +faker.commerce.price({ min: 0, max: 100, dec: 0 }),
      isActive: true,
      isPublished: true,
      images: [],
      variants: [],
      brand: BrandData[faker.number.int({ min: 0, max: 4 })],
      section: SectionData[faker.number.int({ min: 0, max: 2 })],
      subCategory: SubCategoryData[faker.number.int({ min: 0, max: 4 })],
    }));
};

export const ProductData: Product[] = getProducts();
