import { Category } from '../models/category.entity';
import { ImageData } from './001_image.data';

export const CategoryData: Category[] = [
  {
    position: 0,
    description: '',
    image: ImageData[0],
    name: 'Calzado nacional',
  },
  {
    position: 1,
    description: '',
    image: ImageData[1],
    name: 'Ropa',
  },
  {
    position: 2,
    description: '',
    image: ImageData[2],
    name: 'Perfumes',
  },
];
