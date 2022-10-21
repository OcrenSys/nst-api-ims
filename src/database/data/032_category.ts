import { Category } from '../../api/categories/entities/category.entity';

export const CategoryData: Category[] = [
  {
    order: 0,
    description: '',
    name: 'Calzado nacional',
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    order: 1,
    description: '',
    name: 'Ropa',
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    order: 2,
    description: '',
    name: 'Perfumes',
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
];
