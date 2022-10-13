import { SubCategory } from '../../api/sub-categories/entities/sub-category.entity';
import { CategoryData } from './032_category';

export const SubCategoryData: SubCategory[] = [
  {
    order: 0,
    name: 'Calzado  para dama',
    category: CategoryData[0],
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    order: 1,
    name: 'Calzado para caballero',
    category: CategoryData[0],
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    order: 2,
    name: 'Ropa para dama',
    isActive: true,
    category: CategoryData[1],
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    order: 3,
    name: 'Ropa para caballero',
    isActive: true,
    category: CategoryData[1],
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    order: 4,
    name: 'Perfumes para caballero',
    isActive: true,
    category: CategoryData[2],
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
];
