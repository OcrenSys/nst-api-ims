import { Variant } from '../../api/variants/entities/variant.entity';
import { ProductData } from './03_product.data';

export const VariantData: Variant[] = [
  {
    order: 1,
    code: '1232323',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    images: [],
    invoiceDetail: null,
    name: 'PK-123456',
    stock: 3,
    cost: 450,
    price: 600,
    priceCredit: 700,
    isActive: true,
    isPublished: true,
    brand: null,
    product: ProductData[0],
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    order: 2,
    code: '4354545545',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    images: [],
    invoiceDetail: null,
    name: 'PK-987654',
    stock: 3,
    cost: 450,
    price: 600,
    priceCredit: 700,
    isActive: true,
    isPublished: true,
    brand: null,
    product: ProductData[0],
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    order: 3,
    code: '1212112',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    images: [],
    invoiceDetail: null,
    name: 'PK-990090',
    stock: 3,
    cost: 450,
    price: 600,
    priceCredit: 700,
    isActive: true,
    isPublished: true,
    brand: null,
    product: ProductData[0],
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
];
