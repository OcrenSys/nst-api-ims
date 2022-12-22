import { Variant } from '../models/variant.entity';
import { ProductData } from './033_product.data';

export const VariantData: Variant[] = [
  {
    position: 1,
    code: '1232323',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    images: [],
    orderDetail: null,
    name: 'PK-123456',
    stock: 3,
    cost: 450,
    price: 600,
    priceCredit: 700,
    isActive: true,
    isPublished: true,
    product: ProductData[2],
    
  },
  {
    position: 2,
    code: '4354545545',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    images: [],
    orderDetail: null,
    name: 'PK-987654',
    stock: 3,
    cost: 450,
    price: 600,
    priceCredit: 700,
    isActive: true,
    isPublished: true,
    product: ProductData[2],
    
  },
  {
    position: 3,
    code: '1212112',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    images: [],
    orderDetail: null,
    name: 'PK-990090',
    stock: 3,
    cost: 450,
    price: 600,
    priceCredit: 700,
    isActive: true,
    isPublished: true,
    product: ProductData[2],
    
  },
];
