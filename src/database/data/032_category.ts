import { Category } from '../../api/categories/entities/category.entity';
import { ImageData } from './001_image.data';

export const CategoryData: Category[] = [
  {
    order: 0,
    description: '',
    image: ImageData[0],
    name: 'Calzado nacional',
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    order: 1,
    description: '',
    image: ImageData[1],
    name: 'Ropa',
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    order: 2,
    description: '',
    image: ImageData[2],
    name: 'Perfumes',
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
];
