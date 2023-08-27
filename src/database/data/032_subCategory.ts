import { SubCategory } from '../models/sub-category.entity';
import { ImageData } from './001_image.data';
import { CategoryData } from './032_category';
import { faker } from '@faker-js/faker';

const getSubCategories = (): SubCategory[] => {
  return Array(50)
    .fill(null)
    .map((value, index) => ({
      position: 0,
      name: faker.commerce.department.name,
      category: CategoryData[faker.number.int({ min: 0, max: 19 })],
      image: ImageData[index],
    }));
};

export const SubCategoryData: SubCategory[] = getSubCategories();
