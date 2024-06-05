import { Banner } from '../models/banner.entity';
import { ImageData } from './001_image.data';

export const BannerData: Banner[] = [
  {
    name: 'Spring Sale',
    description: 'Enjoy up to 50% off on spring collection.',
    isActive: true,
    image: ImageData[0],
  },
  {
    name: 'Summer Discount',
    description: 'Huge discounts on summer essentials.',
    isActive: true,
    image: ImageData[1],
  },
  {
    name: 'Black Friday',
    description: 'Black Friday deals up to 70% off.',
    isActive: true,
    image: ImageData[2],
  },
  {
    name: 'Holiday Specials',
    description: 'Special discounts for the holiday season.',
    isActive: true,
    image: ImageData[3],
  },
  {
    name: 'New Year New You',
    description: 'Kickstart the new year with amazing deals.',
    isActive: false,
    image: ImageData[4],
  },
  {
    name: "Valentine's Day Special",
    description: "Special offers for Valentine's Day gifts.",
    isActive: true,
    image: ImageData[5],
  },
];
