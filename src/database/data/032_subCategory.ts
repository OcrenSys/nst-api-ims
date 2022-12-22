import { SubCategory } from '../models/sub-category.entity';
import { CategoryData } from './032_category';

export const SubCategoryData: SubCategory[] = [
  {
    position: 0,
    name: 'Calzado  para dama',
    category: CategoryData[0],
  },
  {
    position: 1,
    name: 'Calzado para caballero',
    category: CategoryData[0],
  },
  {
    position: 2,
    name: 'Ropa para dama',
    category: CategoryData[1],
  },
  {
    position: 3,
    name: 'Ropa para caballero',
    category: CategoryData[1],
  },
  {
    position: 4,
    name: 'Perfumes para caballero',
    category: CategoryData[2],
  },
];
