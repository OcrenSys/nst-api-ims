import { OrderDetail } from '../models/order-detail.entity';
import { ProductData } from './033_product.data';
import { OrderData } from './041_order.data';

export const OrderDetailsData: OrderDetail[] = [
  {
    amount: 1,
    cost: 450,
    order: OrderData[0],
    price: 700,
    product: ProductData[0],
  },
  {
    amount: 2,
    cost: 450,
    order: OrderData[0],
    price: 700,
    product: ProductData[1],
  },
  {
    amount: 3,
    cost: 450,
    order: OrderData[1],
    price: 700,
    product: ProductData[2],
  },
];
