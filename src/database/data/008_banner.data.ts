import { Banner } from '../../api/banners/entities/banner.entity';
import { ImageData } from './001_image.data';

export const BannerData: Banner[] = [
  {
    name: 'Banner 1',
    isActive: true,
    image: ImageData[0],
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    name: 'Banner 2',
    isActive: true,
    image: ImageData[1],
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    name: 'Banner 3',
    isActive: true,
    image: ImageData[2],
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
];
